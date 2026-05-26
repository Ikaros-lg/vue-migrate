<template>
  <div class="volume-knob">
    <button class="volume-knob__icon" @click="onToggleMute" title="Toggle mute (M)">
      <span v-if="isMuted || volume === 0">🔇</span>
      <span v-else-if="volume < 0.5">🔉</span>
      <span v-else>🔊</span>
    </button>
    <div class="volume-knob__track">
      <div class="volume-knob__fill" :style="{ width: (volume * 100) + '%' }" />
      <input
        type="range"
        class="volume-knob__input"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolumeKnob',
  computed: {
    volume() {
      return this.$store.state.player.volume
    },
    isMuted() {
      return this.$store.state.player.isMuted
    }
  },
  methods: {
    onInput(e) {
      this.$emit('volume-change', parseFloat(e.target.value))
    },
    onToggleMute() {
      this.$store.commit('player/TOGGLE_MUTE')
    }
  }
}
</script>

<style lang="scss" scoped>
.volume-knob {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);

  &__icon {
    font-size: 14px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    line-height: 1;
    opacity: 0.7;
    transition: opacity var(--transition);
    flex-shrink: 0;

    &:hover {
      opacity: 1;
    }
  }

  &__track {
    position: relative;
    width: 72px;
    height: 4px;
    background: var(--border);
    border-radius: var(--radius-full);
    cursor: pointer;
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
