<template>
  <div
    class="album-art"
    :class="[`album-art--${size}`, { 'album-art--spinning': isPlaying }]"
  >
    <img
      :src="src || ''"
      :alt="alt"
      class="album-art__img"
      @error="onImgError"
    />
    <div v-if="imgError || !src" class="album-art__fallback">
      <span>♪</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumArt',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'Album art'
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v)
    }
  },
  data() {
    return {
      imgError: false
    }
  },
  watch: {
    src() {
      this.imgError = false
    }
  },
  methods: {
    onImgError() {
      this.imgError = true
    }
  }
}
</script>

<style lang="scss" scoped>
.album-art {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-card);
  flex-shrink: 0;

  &--sm {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
  }

  &--md {
    width: 56px;
    height: 56px;
  }

  &--lg {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  }

  &--spinning {
    animation: spin-art 12s linear infinite;
    animation-play-state: running;
  }

  &:not(.album-art--spinning) {
    animation: spin-art 12s linear infinite;
    animation-play-state: paused;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    font-size: 1.5em;
    color: var(--text-2);
  }
}

@keyframes spin-art {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
