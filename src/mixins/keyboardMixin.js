export default {
  mounted() {
    this._keyHandler = (e) => {
      const tag = e.target.tagName.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return

      if (e.code === 'Space') {
        e.preventDefault()
        this.$store.dispatch('player/togglePlay')
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        const time = Math.max(0, this.$store.state.player.currentTime - 10)
        this.$store.commit('player/SET_TIME', { currentTime: time })
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        const time = Math.min(
          this.$store.state.player.duration,
          this.$store.state.player.currentTime + 10
        )
        this.$store.commit('player/SET_TIME', { currentTime: time })
      } else if (e.code === 'KeyM') {
        this.$store.commit('player/TOGGLE_MUTE')
      }
    }
    document.addEventListener('keydown', this._keyHandler)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this._keyHandler)
  }
}
