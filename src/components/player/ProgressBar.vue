<template>
  <div class="progress-bar">
    <span class="progress-bar__time">{{ formatDuration(currentTime) }}</span>
    <div class="progress-bar__track">
      <div class="progress-bar__fill" :style="{ width: progressPercent + '%' }" />
      <div class="progress-bar__thumb" :style="{ left: progressPercent + '%' }" />
      <input
        type="range"
        class="progress-bar__input"
        min="0"
        :max="duration || 100"
        :value="currentTime"
        step="0.1"
        @input="onInput"
      />
    </div>
    <span class="progress-bar__time">{{ formatDuration(duration) }}</span>
  </div>
</template>

<script>
import durationMixin from '@/mixins/durationMixin'

export default {
  name: 'ProgressBar',
  mixins: [durationMixin],
  computed: {
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
    onInput(e) {
      this.$emit('seek', Number.parseFloat(e.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;

  &__time {
    font-size: 11px;
    color: var(--text-2);
    min-width: 32px;
    text-align: center;
    flex-shrink: 0;
  }

  &__track {
    flex: 1;
    position: relative;
    height: 4px;
    background: var(--border);
    border-radius: var(--radius-full);
    cursor: pointer;

    &:hover .progress-bar__thumb {
      opacity: 1;
    }
  }

  &__fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: var(--accent);
    border-radius: var(--radius-full);
    pointer-events: none;
  }

  &__thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  &__input {
    position: absolute;
    inset: -8px 0;
    width: 100%;
    height: calc(100% + 16px);
    opacity: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
  }
}
</style>
