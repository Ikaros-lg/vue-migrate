const DEMO_TRACKS = [
  {
    id: 1,
    title: 'Ambient Drift',
    artist: 'Luna Echo',
    album: 'Quiet Frequencies',
    src: '/audio/track1.mp3',
    cover: '/covers/cover1.jpg',
    duration: 213
  },
  {
    id: 2,
    title: 'Neon Rain',
    artist: 'Synth Collective',
    album: 'City Lights',
    src: '/audio/track2.mp3',
    cover: '/covers/cover2.jpg',
    duration: 187
  },
  {
    id: 3,
    title: 'Deep Horizon',
    artist: 'The Void Project',
    album: 'Vast',
    src: '/audio/track3.mp3',
    cover: '/covers/cover3.jpg',
    duration: 254
  },
  {
    id: 4,
    title: 'Morning Static',
    artist: 'Luna Echo',
    album: 'Quiet Frequencies',
    src: '/audio/track4.mp3',
    cover: '/covers/cover1.jpg',
    duration: 198
  },
  {
    id: 5,
    title: 'Pulse',
    artist: 'Synth Collective',
    album: 'City Lights',
    src: '/audio/track5.mp3',
    cover: '/covers/cover2.jpg',
    duration: 172
  }
]

export default {
  namespaced: true,

  state: () => ({
    tracks: [],
    playlists: [],
    status: 'idle'
  }),

  mutations: {
    SET_TRACKS(state, tracks) {
      state.tracks = tracks
    },
    SET_STATUS(state, status) {
      state.status = status
    }
  },

  actions: {
    async fetchLibrary({ commit, state, dispatch }) {
      if (state.status === 'loading' || state.tracks.length > 0) return

      commit('SET_STATUS', 'loading')
      dispatch('ui/showLoading', null, { root: true })

      await new Promise(resolve => setTimeout(resolve, 300))

      commit('SET_TRACKS', DEMO_TRACKS)
      commit('SET_STATUS', 'idle')
      dispatch('ui/hideLoading', null, { root: true })
    }
  }
}
