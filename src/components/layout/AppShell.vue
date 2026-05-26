<template>
  <div class="app-shell">
    <Sidebar />
    <main class="app-shell__content">
      <router-view />
    </main>
    <NowPlayingPanel />
    <PlayerBar />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import PlayerBar from '@/components/player/PlayerBar.vue'
import NowPlayingPanel from './NowPlayingPanel.vue'

export default {
  name: 'AppShell',
  components: { Sidebar, PlayerBar, NowPlayingPanel }
}
</script>

<style lang="scss" scoped>
.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr var(--right-panel-width);
  grid-template-rows: 1fr var(--player-height);
  grid-template-areas:
    'sidebar content panel'
    'player  player  player';
  height: 100vh;
  overflow: hidden;

  .sidebar {
    grid-area: sidebar;
    overflow-y: auto;
  }

  &__content {
    grid-area: content;
    overflow-y: auto;
    background: var(--bg-base);
  }

  .now-playing-panel {
    grid-area: panel;
    overflow-y: auto;
  }

  .player-bar {
    grid-area: player;
  }
}
</style>
