<template>
  <li
    class="track-row"
    :class="{ 'track-row--active': isActive }"
    @click="onPlay"
  >
    <div class="track-row__cover">
      <img :src="track.cover" :alt="track.title" @error="onCoverError" />
      <div v-if="coverError" class="track-row__cover-fallback">♪</div>
      <div class="track-row__play-overlay">
        <span v-if="isActive && isPlaying" class="track-row__bars">
          <span class="track-row__bar" />
          <span class="track-row__bar" />
          <span class="track-row__bar" />
        </span>
        <span v-else-if="isActive" class="track-row__paused-icon">❙❙</span>
        <span v-else>▶</span>
      </div>
    </div>

    <div class="track-row__info">
      <p class="track-row__title">{{ track.title }}</p>
      <p class="track-row__artist">{{ track.artist }}</p>
    </div>

    <p class="track-row__album">{{ track.album }}</p>

    <p class="track-row__duration">{{ formatDuration(track.duration) }}</p>
  </li>
</template>

<script>
import durationMixin from '@/mixins/durationMixin'

export default {
  name: 'TrackRow',
  mixins: [durationMixin],
  props: {
    track: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coverError: false
    }
  },
  computed: {
    isPlaying() {
      return this.$store.state.player.isPlaying
    }
  },
  methods: {
    onPlay() {
      this.$store.dispatch('player/playTrack', this.track)
    },
    onCoverError() {
      this.coverError = true
    }
  }
}
</script>

<style lang="scss" scoped>
.track-row {
  display: grid;
  grid-template-columns: 40px 1fr 1fr auto;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.05);

    .track-row__play-overlay {
      opacity: 1;
    }
  }

  &--active {
    .track-row__title {
      color: var(--accent);
    }

    .track-row__play-overlay {
      opacity: 1;
      color: var(--accent);
    }
  }

  &__cover {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--bg-card);
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__cover-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--text-2);
    background: var(--bg-card);
  }

  &__play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    color: #fff;
    opacity: 0;
    transition: opacity var(--transition);
  }

  &__info {
    min-width: 0;
  }

  &__title {
    font-size: 14px;
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
  }

  &__album {
    font-size: 13px;
    color: var(--text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__duration {
    font-size: 12px;
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }

  &__bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  &__bar {
    display: block;
    width: 3px;
    background: var(--accent);
    border-radius: 2px;
    animation: bar-bounce 0.8s ease-in-out infinite alternate;

    &:nth-child(1) { height: 6px; animation-delay: 0s; }
    &:nth-child(2) { height: 12px; animation-delay: 0.2s; }
    &:nth-child(3) { height: 8px; animation-delay: 0.4s; }
  }

  &__paused-icon {
    font-size: 10px;
    color: var(--accent);
    letter-spacing: 1px;
  }
}

@keyframes bar-bounce {
  from { transform: scaleY(0.4); }
  to   { transform: scaleY(1); }
}
</style>
