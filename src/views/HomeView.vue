<template>
  <div class="home-view">
    <header class="home-view__header">
      <h1 class="home-view__heading">Good evening</h1>
      <p class="home-view__subheading">Pick up where you left off</p>
    </header>

    <section class="home-view__section">
      <h2 class="home-view__section-title">Featured Tracks</h2>
      <div class="home-view__featured">
        <div
          v-for="track in featuredTracks"
          :key="track.id"
          class="home-view__card"
          :class="{ 'home-view__card--active': isCurrentTrack(track) }"
          @click="playTrack(track)"
        >
          <div
            class="home-view__card-cover"
            :style="{ background: trackGradient(track) }"
          >
            <img :src="track.cover" :alt="track.title" @error="e => e.target.style.display='none'" />
            <div
              class="home-view__card-overlay"
              :class="{ 'home-view__card-overlay--visible': isCurrentTrack(track) }"
            >
              <span v-if="isCurrentTrack(track) && isPlaying">⏸</span>
              <span v-else>▶</span>
            </div>
          </div>
          <p class="home-view__card-title">{{ track.title }}</p>
          <p class="home-view__card-artist">{{ track.artist }}</p>
        </div>
      </div>
    </section>

    <section class="home-view__section">
      <h2 class="home-view__section-title">All Tracks</h2>
      <TrackList />
    </section>
  </div>
</template>

<script>
import TrackList from '@/components/library/TrackList.vue'

export default {
  name: 'HomeView',
  components: { TrackList },
  computed: {
    featuredTracks() {
      return this.$store.state.library.tracks.slice(0, 3)
    },
    currentTrack() {
      return this.$store.state.player.currentTrack
    },
    isPlaying() {
      return this.$store.state.player.isPlaying
    }
  },
  created() {
    this.$store.dispatch('library/fetchLibrary')
  },
  methods: {
    playTrack(track) {
      this.$store.dispatch('player/playTrack', track)
    },
    isCurrentTrack(track) {
      return this.currentTrack && this.currentTrack.id === track.id
    },
    trackGradient(track) {
      const hues = [260, 200, 320, 170, 30]
      const hue = hues[(track.id - 1) % hues.length]
      return `linear-gradient(135deg, hsl(${hue}, 40%, 18%), hsl(${hue + 30}, 30%, 12%))`
    }
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  padding: var(--spacing-8);

  &__header {
    margin-bottom: var(--spacing-8);
  }

  &__heading {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-1);
  }

  &__subheading {
    font-size: 14px;
    color: var(--text-2);
    margin-top: var(--spacing-1);
  }

  &__section {
    margin-bottom: var(--spacing-8);
  }

  &__section-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-1);
    margin-bottom: var(--spacing-4);
  }

  &__featured {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-6);
  }

  &__card {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    overflow: hidden;
    cursor: pointer;
    transition: border-color var(--transition), transform var(--transition);

    &:hover {
      border-color: var(--accent);
      transform: translateY(-2px);

      .home-view__card-overlay {
        opacity: 1;
      }
    }

    &--active {
      border-color: var(--accent);

      .home-view__card-title {
        color: var(--accent);
      }
    }
  }

  &__card-cover {
    position: relative;
    aspect-ratio: 1;
    background: var(--bg-surface);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 24px;
    color: #fff;
    opacity: 0;
    transition: opacity var(--transition);

    &--visible {
      opacity: 0.85;
    }
  }

  &__card-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-1);
    padding: var(--spacing-3) var(--spacing-3) 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__card-artist {
    font-size: 12px;
    color: var(--text-2);
    padding: 2px var(--spacing-3) var(--spacing-3);
  }
}
</style>
