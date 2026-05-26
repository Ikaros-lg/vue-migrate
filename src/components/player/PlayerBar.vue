<template>
  <div class="player-bar">
    <div class="player-bar__track-info">
      <AlbumArt
        :src="currentTrack ? currentTrack.cover : ''"
        :is-playing="isPlaying"
        size="sm"
      />
      <div v-if="currentTrack" class="player-bar__meta">
        <p class="player-bar__title">{{ currentTrack.title }}</p>
        <p class="player-bar__artist">{{ currentTrack.artist }}</p>
      </div>
      <div v-else class="player-bar__meta player-bar__meta--empty">
        <p class="player-bar__title">No track selected</p>
      </div>
    </div>

    <div class="player-bar__center">
      <div class="player-bar__controls">
        <IconBtn size="sm" :active="isShuffle" @click="toggleShuffle" title="Shuffle">
          ⇄
        </IconBtn>
        <IconBtn size="md" :disabled="!currentTrack" @click="onPrev" title="Previous">
          ⏮
        </IconBtn>
        <IconBtn size="lg" :disabled="!currentTrack" @click="onTogglePlay" title="Play/Pause">
          <span v-if="isPlaying">⏸</span>
          <span v-else>▶</span>
        </IconBtn>
        <IconBtn size="md" :disabled="!currentTrack" @click="onNext" title="Next">
          ⏭
        </IconBtn>
        <IconBtn size="sm" :active="repeatMode !== 'none'" @click="onCycleRepeat" title="Repeat">
          <span v-if="repeatMode === 'one'">🔂</span>
          <span v-else>🔁</span>
        </IconBtn>
      </div>
      <ProgressBar @seek="onSeek" />
    </div>

    <div class="player-bar__right">
      <VolumeKnob @volume-change="onVolumeChange" />
    </div>
  </div>
</template>

<script>
import audioMixin from '@/mixins/audioMixin'
import durationMixin from '@/mixins/durationMixin'
import AlbumArt from './AlbumArt.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeKnob from './VolumeKnob.vue'
import IconBtn from '@/components/ui/IconBtn.vue'

export default {
  name: 'PlayerBar',
  components: { AlbumArt, ProgressBar, VolumeKnob, IconBtn },
  mixins: [audioMixin, durationMixin],
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
    onSeek(time) {
      this.audioSeek(time)
    },
    onVolumeChange(vol) {
      this.audioSetVolume(vol)
    }
  }
}
</script>

<style lang="scss" scoped>
.player-bar {
  height: var(--player-height);
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 var(--spacing-6);
  gap: var(--spacing-4);
  flex-shrink: 0;

  &__track-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    min-width: 0;
  }

  &__meta {
    min-width: 0;

    &--empty .player-bar__title {
      color: var(--text-2);
      font-weight: 400;
    }
  }

  &__title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__artist {
    font-size: 12px;
    color: var(--text-2);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
