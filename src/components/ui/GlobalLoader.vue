<template>
  <transition name="fade">
    <div v-if="isLoading" class="global-loader">
      <div class="global-loader__spinner" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GlobalLoader',
  computed: {
    isLoading() {
      return this.$store.state.ui.isLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.global-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(4px);

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
