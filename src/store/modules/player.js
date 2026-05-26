function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default {
  namespaced: true,

  state: () => ({
    currentTrack: null,
    queue: [],
    queueIndex: 0,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 'none', // 'none' | 'one' | 'all'
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    prevVolume: 0.8
  }),

  mutations: {
    SET_TRACK(state, track) {
      state.currentTrack = track
    },
    SET_PLAYING(state, val) {
      state.isPlaying = val
    },
    SET_TIME(state, { currentTime, duration }) {
      state.currentTime = currentTime
      if (duration != null) state.duration = duration
    },
    SET_VOLUME(state, vol) {
      state.volume = Math.min(1, Math.max(0, vol))
    },
    SET_QUEUE(state, { tracks, index }) {
      state.queue = tracks
      state.queueIndex = index
    },
    NEXT(state) {
      if (state.repeatMode === 'one') return
      const last = state.queue.length - 1
      if (state.queueIndex < last) {
        state.queueIndex++
        state.currentTrack = state.queue[state.queueIndex]
      } else if (state.repeatMode === 'all') {
        state.queueIndex = 0
        state.currentTrack = state.queue[0]
      } else {
        state.isPlaying = false
      }
    },
    PREV(state) {
      if (state.currentTime > 3) {
        state.currentTime = 0
        return
      }
      if (state.queueIndex > 0) {
        state.queueIndex--
        state.currentTrack = state.queue[state.queueIndex]
      }
    },
    TOGGLE_SHUFFLE(state) {
      state.isShuffle = !state.isShuffle
    },
    SET_REPEAT(state, mode) {
      state.repeatMode = mode
    },
    TOGGLE_MUTE(state) {
      if (state.isMuted) {
        state.volume = state.prevVolume
        state.isMuted = false
      } else {
        state.prevVolume = state.volume
        state.volume = 0
        state.isMuted = true
      }
    }
  },

  actions: {
    playTrack({ commit, state, rootState }, track) {
      const allTracks = rootState.library.tracks
      let queue = allTracks.length ? allTracks : [track]
      if (state.isShuffle) queue = shuffleArray(queue)
      const index = queue.findIndex(t => t.id === track.id)
      commit('SET_QUEUE', { tracks: queue, index: index >= 0 ? index : 0 })
      commit('SET_TRACK', track)
      commit('SET_TIME', { currentTime: 0, duration: track.duration || 0 })
      commit('SET_PLAYING', true)
    },
    togglePlay({ commit, state }) {
      commit('SET_PLAYING', !state.isPlaying)
    },
    seekTo({ commit }, time) {
      commit('SET_TIME', { currentTime: time })
    },
    changeVolume({ commit }, vol) {
      commit('SET_VOLUME', vol)
    },
    playNext({ commit, state }) {
      if (state.repeatMode === 'one') {
        commit('SET_TIME', { currentTime: 0 })
        commit('SET_PLAYING', true)
        return
      }
      commit('NEXT')
      if (state.isPlaying || state.queue.length > 0) {
        commit('SET_PLAYING', state.currentTrack != null)
      }
    },
    playPrev({ commit }) {
      commit('PREV')
      commit('SET_PLAYING', true)
    },
    cycleRepeat({ commit, state }) {
      const modes = ['none', 'all', 'one']
      const next = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length]
      commit('SET_REPEAT', next)
    }
  }
}
