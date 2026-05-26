<template>
  <div class="now-playing-view">
    <div v-if="currentTrack" class="now-playing-view__content">
      <AlbumArt
        :src="currentTrack.cover"
        :is-playing="isPlaying"
        size="lg"
      />

      <div class="now-playing-view__info">
        <h1 class="now-playing-view__title">{{ currentTrack.title }}</h1>
        <p class="now-playing-view__artist">{{ currentTrack.artist }}</p>
        <p class="now-playing-view__album">{{ currentTrack.album }}</p>
      </div>

      <div class="now-playing-view__controls">
        <IconBtn size="sm" :active="isShuffle" @click="toggleShuffle" title="Shuffle">⇄</IconBtn>
        <IconBtn size="md" @click="onPrev" title="Previous">⏮</IconBtn>
        <IconBtn size="lg" @click="onTogglePlay" title="Play/Pause">
          <span v-if="isPlaying">⏸</span>
          <span v-else>▶</span>
        </IconBtn>
        <IconBtn size="md" @click="onNext" title="Next">⏭</IconBtn>
        <IconBtn size="sm" :active="repeatMode !== 'none'" @click="onCycleRepeat" title="Repeat">
          <span v-if="repeatMode === 'one'">🔂</span>
          <span v-else>🔁</span>
        </IconBtn>
      </div>

      <div class="now-playing-view__progress">
        <span class="now-playing-view__time">{{ formatDuration(currentTime) }}</span>
        <div class="now-playing-view__bar" @click="onBarClick">
          <div class="now-playing-view__bar-fill" :style="{ width: progressPercent + '%' }" />
        </div>
        <span class="now-playing-view__time">{{ formatDuration(duration) }}</span>
      </div>
    </div>

    <div v-else class="now-playing-view__empty">
      <p class="now-playing-view__empty-icon">♪</p>
      <p class="now-playing-view__empty-text">Nothing playing yet</p>
      <router-link to="/library" class="now-playing-view__empty-link">Browse Library</router-link>
    </div>
  </div>
</template>

<script>
import AlbumArt from '@/components/player/AlbumArt.vue'
import IconBtn from '@/components/ui/IconBtn.vue'
import durationMixin from '@/mixins/durationMixin'

export default {
  name: 'NowPlayingView',
  components: { AlbumArt, IconBtn },
  mixins: [durationMixin],
  computed: {
    currentTrack() {
      return this.$store.state.player.currentTrack
    },
    isPlaying() {
      return this.$store.state.player.isPlaying
    },
    isShuffle() {
      return this.$store.state.player.isShuffle
    },
    repeatMode() {
      return this.$store.state.player.repeatMode
    },
    currentTime() {
      return this.$store.state.player.currentTime
    },
    duration() {
      return this.$store.state.player.duration
    },
    progressPercent() {
      if (!this.duration) return 0
      return (this.currentTime / this.duration) * 100
    }
  },
  methods: {
    onTogglePlay() {
      this.$store.dispatch('player/togglePlay')
    },
    onNext() {
      this.$store.dispatch('player/playNext')
    },
    onPrev() {
      this.$store.dispatch('player/playPrev')
    },
    toggleShuffle() {
      this.$store.commit('player/TOGGLE_SHUFFLE')
    },
    onCycleRepeat() {
      this.$store.dispatch('player/cycleRepeat')
    },
    onBarClick(e) {
      if (!this.duration) return
      const rect = e.currentTarget.getBoundingClientRect()
      const ratio = (e.clientX - rect.left) / rect.width
      this.$store.commit('player/SET_TIME', { currentTime: ratio * this.duration })
    }
  }
}
</script>

<style lang="scss" scoped>
.now-playing-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: var(--spacing-8);

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-6);
    max-width: 380px;
    width: 100%;
  }

  &__info {
    text-align: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-1);
  }

  &__artist {
    font-size: 14px;
    color: var(--accent);
    margin-top: var(--spacing-1);
  }

  &__album {
    font-size: 13px;
    color: var(--text-2);
    margin-top: 2px;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  &__progress {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    width: 100%;
  }

  &__time {
    font-size: 12px;
    color: var(--text-2);
    min-width: 36px;
    text-align: center;
  }

  &__bar {
    flex: 1;
    height: 4px;
    background: var(--border);
    border-radius: var(--radius-full);
    cursor: pointer;
    position: relative;

    &:hover {
      height: 6px;
    }
  }

  &__bar-fill {
    height: 100%;
    background: var(--accent);
    border-radius: var(--radius-full);
    pointer-events: none;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4);
    text-align: center;
  }

  &__empty-icon {
    font-size: 64px;
    opacity: 0.2;
  }

  &__empty-text {
    font-size: 16px;
    color: var(--text-2);
  }

  &__empty-link {
    font-size: 14px;
    color: var(--accent);
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
