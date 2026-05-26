<template>
  <button
    class="icon-btn"
    :class="[`icon-btn--${size}`, { 'is-active': active, 'is-disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'IconBtn',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v)
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-2);
  transition: background var(--transition), color var(--transition), transform var(--transition);
  flex-shrink: 0;

  &:hover:not(:disabled) {
    color: var(--text-1);
    background: rgba(255, 255, 255, 0.08);
  }

  &:active:not(:disabled) {
    transform: scale(0.92);
  }

  &.is-active {
    color: var(--accent);
  }

  &.is-disabled,
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &--sm {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  &--md {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  &--lg {
    width: 48px;
    height: 48px;
    font-size: 22px;
    background: var(--accent);
    color: #fff;

    &:hover:not(:disabled) {
      background: var(--accent-hover);
      color: #fff;
    }
  }
}
</style>
