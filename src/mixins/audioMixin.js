export default {
  created() {
    this.$audio = new Audio()
    this.$audio.volume = this.$store.state.player.volume
    this._lastTimeUpdate = 0

    this.$audio.addEventListener('timeupdate', () => {
      const now = Date.now()
      if (now - this._lastTimeUpdate < 250) return
      this._lastTimeUpdate = now
      this.$store.commit('player/SET_TIME', {
        currentTime: this.$audio.currentTime,
        duration: this.$audio.duration || 0
      })
    })

    this.$audio.addEventListener('ended', () => {
      this.$store.dispatch('player/playNext')
    })

    this.$audio.addEventListener('loadedmetadata', () => {
      this.$store.commit('player/SET_TIME', {
        currentTime: 0,
        duration: this.$audio.duration || 0
      })
    })
  },

  beforeDestroy() {
    this.$audio.pause()
    this.$audio.src = ''
    this.$audio = null
  },

  watch: {
    '$store.state.player.currentTrack'(track) {
      if (!track) return
      this.$audio.pause()
      this.$audio.src = track.src
      // load() synchronously resets audio.currentTime to 0 so the SET_TIME
      // watcher that fires next in playTrack won't trigger an aborting seek
      this.$audio.load()
      this.$audio.volume = this.$store.state.player.volume
      if (this.$store.state.player.isPlaying) {
        this.$audio.play().catch(() => {})
      }
    },
    '$store.state.player.isPlaying'(playing) {
      if (playing) {
        this.$audio.play().catch(() => {})
      } else {
        this.$audio.pause()
      }
    },
    '$store.state.player.volume'(vol) {
      if (this.$audio) this.$audio.volume = vol
    },
    '$store.state.player.currentTime'(time) {
      if (Math.abs(this.$audio.currentTime - time) > 1) {
        this.$audio.currentTime = time
      }
    }
  },

  methods: {
    audioPlay() {
      this.$audio.play().catch(() => {})
      this.$store.commit('player/SET_PLAYING', true)
    },
    audioPause() {
      this.$audio.pause()
      this.$store.commit('player/SET_PLAYING', false)
    },
    audioTogglePlay() {
      this.$store.dispatch('player/togglePlay')
    },
    audioSeek(time) {
      this.$audio.currentTime = time
      this.$store.commit('player/SET_TIME', { currentTime: time })
    },
    audioSetVolume(vol) {
      this.$audio.volume = vol
      this.$store.dispatch('player/changeVolume', vol)
    }
  }
}
