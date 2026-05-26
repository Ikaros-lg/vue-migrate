<template>
  <aside class="now-playing-panel">
    <div v-if="currentTrack" class="now-playing-panel__content">
      <div class="now-playing-panel__art-wrap">
        <AlbumArt
          :src="currentTrack.cover"
          :is-playing="isPlaying"
          size="lg"
        />
      </div>

      <div class="now-playing-panel__meta">
        <p class="now-playing-panel__title">{{ currentTrack.title }}</p>
        <p class="now-playing-panel__artist">{{ currentTrack.artist }}</p>
        <p class="now-playing-panel__album">{{ currentTrack.album }}</p>
      </div>

      <div class="now-playing-panel__progress">
        <ProgressBar @seek="onSeek" />
      </div>

      <div class="now-playing-panel__controls">
        <button class="now-playing-panel__ctrl-btn" @click="playPrev" title="Previous">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
        </button>

        <button class="now-playing-panel__ctrl-btn now-playing-panel__ctrl-btn--play" @click="togglePlay">
          <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>

        <button class="now-playing-panel__ctrl-btn" @click="playNext" title="Next">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="now-playing-panel__empty">
      <div class="now-playing-panel__empty-icon">♪</div>
      <p class="now-playing-panel__empty-text">Nothing playing yet</p>
      <p class="now-playing-panel__empty-hint">Pick a track to start listening</p>
    </div>
  </aside>
</template>

<script>
import AlbumArt from '@/components/player/AlbumArt.vue'
import ProgressBar from '@/components/player/ProgressBar.vue'

export default {
  name: 'NowPlayingPanel',
  components: { AlbumArt, ProgressBar },
  computed: {
    currentTrack() {
      return this.$store.state.player.currentTrack
    },
    isPlaying() {
      return this.$store.state.player.isPlaying
    }
  },
  methods: {
    togglePlay() {
      this.$store.dispatch('player/togglePlay')
    },
    playNext() {
      this.$store.dispatch('player/playNext')
    },
    playPrev() {
      this.$store.dispatch('player/playPrev')
    },
    onSeek(time) {
      this.$store.dispatch('player/seekTo', time)
    }
  }
}
</script>

<style lang="scss" scoped>
.now-playing-panel {
  grid-area: panel;
  background: var(--bg-surface);
  border-left: 1px solid var(--border);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-8) var(--spacing-4) var(--spacing-6);
    gap: var(--spacing-4);
  }

  &__art-wrap {
    width: 180px;
    height: 180px;
    flex-shrink: 0;

    ::v-deep .album-art--lg {
      width: 180px;
      height: 180px;
    }
  }

  &__meta {
    width: 100%;
    text-align: center;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__artist {
    font-size: 13px;
    color: var(--accent);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__album {
    font-size: 12px;
    color: var(--text-2);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__progress {
    width: 100%;
    padding: 0 var(--spacing-1);
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-top: var(--spacing-2);
  }

  &__ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: var(--text-2);
    cursor: pointer;
    padding: var(--spacing-2);
    border-radius: var(--radius-full);
    transition: color var(--transition), background var(--transition);

    &:hover {
      color: var(--text-1);
      background: var(--bg-card);
    }

    &--play {
      width: 44px;
      height: 44px;
      background: var(--accent);
      color: #fff;
      border-radius: var(--radius-full);

      &:hover {
        background: var(--accent-hover);
        color: #fff;
      }
    }
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-8);
    gap: var(--spacing-2);
  }

  &__empty-icon {
    font-size: 40px;
    color: var(--border);
    margin-bottom: var(--spacing-2);
  }

  &__empty-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-2);
  }

  &__empty-hint {
    font-size: 12px;
    color: var(--border);
    text-align: center;
  }
}
</style>
