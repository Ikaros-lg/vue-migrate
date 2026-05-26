<template>
  <nav class="sidebar">
    <div class="sidebar__logo">
      <span class="sidebar__logo-icon">♪</span>
      <span class="sidebar__logo-text">Toan</span>
    </div>

    <div class="sidebar__section">
      <p class="sidebar__label">Menu</p>
      <router-link to="/" exact class="sidebar__link">
        <span class="sidebar__link-icon">⌂</span>
        Home
      </router-link>
      <router-link to="/library" class="sidebar__link">
        <span class="sidebar__link-icon">♫</span>
        Library
      </router-link>
      <router-link to="/now-playing" class="sidebar__link">
        <span class="sidebar__link-icon">▶</span>
        Now Playing
      </router-link>
    </div>

    <div v-if="currentTrack" class="sidebar__now-playing">
      <p class="sidebar__label">Now Playing</p>
      <p class="sidebar__track-title">{{ currentTrack.title }}</p>
      <p class="sidebar__track-artist">{{ currentTrack.artist }}</p>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    currentTrack() {
      return this.$store.state.player.currentTrack
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100%;
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-6);
  gap: var(--spacing-8);
  flex-shrink: 0;

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding-bottom: var(--spacing-4);
    border-bottom: 1px solid var(--border);
  }

  &__logo-icon {
    font-size: 20px;
    color: var(--accent);
  }

  &__logo-text {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-1);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-2);
    margin-bottom: var(--spacing-2);
  }

  &__link {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-sm);
    color: var(--text-2);
    font-size: 14px;
    font-weight: 500;
    transition: background var(--transition), color var(--transition);

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-1);
    }

    &.router-link-active {
      background: rgba(124, 106, 247, 0.15);
      color: var(--accent);
    }
  }

  &__link-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  &__now-playing {
    margin-top: auto;
    padding: var(--spacing-3);
    background: var(--bg-card);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
  }

  &__track-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: var(--spacing-2);
  }

  &__track-artist {
    font-size: 12px;
    color: var(--text-2);
    margin-top: 2px;
  }
}
</style>
