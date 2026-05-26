<template>
  <div class="library-view">
    <header class="library-view__header">
      <h1 class="library-view__heading">Library</h1>
      <p class="library-view__count">{{ trackCount }} tracks</p>
    </header>
    <TrackList />
  </div>
</template>

<script>
import TrackList from '@/components/library/TrackList.vue'

export default {
  name: 'LibraryView',
  components: { TrackList },
  computed: {
    trackCount() {
      return this.$store.state.library.tracks.length
    }
  },
  created() {
    this.$store.dispatch('library/fetchLibrary')
  }
}
</script>

<style lang="scss" scoped>
.library-view {
  padding: var(--spacing-8);

  &__header {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-6);
  }

  &__heading {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-1);
  }

  &__count {
    font-size: 13px;
    color: var(--text-2);
  }
}
</style>
