<template>
  <div class="track-list">
    <div class="track-list__header">
      <span></span>
      <span>Title</span>
      <span>Album</span>
      <span>Duration</span>
    </div>
    <ul class="track-list__items">
      <TrackRow
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        :is-active="currentTrack && currentTrack.id === track.id"
      />
    </ul>
    <p v-if="!tracks.length" class="track-list__empty">No tracks found.</p>
  </div>
</template>

<script>
import TrackRow from './TrackRow.vue'

export default {
  name: 'TrackList',
  components: { TrackRow },
  computed: {
    tracks() {
      return this.$store.state.library.tracks
    },
    currentTrack() {
      return this.$store.state.player.currentTrack
    }
  }
}
</script>

<style lang="scss" scoped>
.track-list {
  &__header {
    display: grid;
    grid-template-columns: 40px 1fr 1fr auto;
    gap: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-4);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-2);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--spacing-2);
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__empty {
    text-align: center;
    color: var(--text-2);
    padding: var(--spacing-12);
    font-size: 14px;
  }
}
</style>
