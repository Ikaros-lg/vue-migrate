# Toan — Vue 2 Music Player

A minimalist, modern music audio player built with Vue 2 + Vite.

---

## Tech Stack

| Layer | Package | Version |
|---|---|---|
| Framework | vue | ^2.7.16 |
| Build | vite | ^5.x |
| Vue 2 Vite plugin | vite-plugin-vue2 | ^2.0.3 |
| Router | vue-router | ^3.6.5 |
| State | vuex | ^3.6.2 |
| CSS pre-processor | sass | ^1.x |

> **Why Vue 2.7?** It ships the Composition API as a built-in so mixins and Options API co-exist cleanly — no extra packages needed.

---

## Project Structure

```
vue-migrate/
├── public/
│   ├── audio/              # Local .mp3/.flac demo tracks
│   └── covers/             # Album artwork JPEGs
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── _variables.scss   # Design tokens (colors, spacing, fonts)
│   │       ├── _reset.scss       # CSS reset
│   │       └── main.scss         # Global entry — imports all partials
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.vue      # Root layout wrapper
│   │   │   └── Sidebar.vue       # Navigation sidebar
│   │   ├── player/
│   │   │   ├── PlayerBar.vue     # Fixed bottom bar (main player UI)
│   │   │   ├── ProgressBar.vue   # Seek slider
│   │   │   ├── VolumeKnob.vue    # Volume slider
│   │   │   └── AlbumArt.vue      # Rotating cover art
│   │   ├── library/
│   │   │   ├── TrackList.vue     # Scrollable list of tracks
│   │   │   └── TrackRow.vue      # Single track row
│   │   └── ui/
│   │       ├── GlobalLoader.vue  # Full-screen loading overlay
│   │       └── IconBtn.vue       # Reusable icon button
│   ├── mixins/
│   │   ├── audioMixin.js         # HTML5 Audio element helpers (play/pause/seek/volume)
│   │   ├── durationMixin.js      # Format seconds → mm:ss
│   │   └── keyboardMixin.js      # Global hotkeys (space = play/pause, arrows = seek)
│   ├── plugins/
│   │   └── loading.js            # Vue.prototype.$loading — show/hide global loader
│   ├── router/
│   │   └── index.js              # Vue Router 3 — hash mode
│   ├── store/
│   │   ├── index.js              # Vuex root store
│   │   └── modules/
│   │       ├── player.js         # nowPlaying, queue, playback state
│   │       ├── library.js        # tracks[], playlists[], fetch logic
│   │       └── ui.js             # isLoading, activeView, toast
│   ├── views/
│   │   ├── HomeView.vue          # Featured / recent tracks
│   │   ├── LibraryView.vue       # Full track library
│   │   └── NowPlayingView.vue    # Expanded player view
│   ├── App.vue                   # Root component — mounts AppShell + RouterView
│   └── main.js                   # App entry — registers plugins, store, router
├── index.html
├── vite.config.js
└── package.json
```

---

## Vuex Store Design

### `store/modules/player.js`
```
state:
  currentTrack: null        // { id, title, artist, album, src, cover }
  queue: []                 // ordered track list
  queueIndex: 0
  isPlaying: false
  isShuffle: false
  repeatMode: 'none'        // 'none' | 'one' | 'all'
  currentTime: 0
  duration: 0
  volume: 0.8

mutations: SET_TRACK, SET_PLAYING, SET_TIME, SET_VOLUME, SET_QUEUE, NEXT, PREV, TOGGLE_SHUFFLE, SET_REPEAT

actions: playTrack, togglePlay, seekTo, changeVolume, playNext, playPrev
```

### `store/modules/library.js`
```
state:
  tracks: []
  playlists: []
  status: 'idle'            // 'idle' | 'loading' | 'error'

actions: fetchLibrary       // sets ui/isLoading via dispatch
```

### `store/modules/ui.js`
```
state:
  isLoading: false
  toasts: []

mutations: SET_LOADING, ADD_TOAST, REMOVE_TOAST
actions: showLoading, hideLoading
```

---

## Mixins

### `audioMixin.js`
- Owns the single `new Audio()` instance (attached to `this.$audio`)
- Exposes: `audioPlay()`, `audioPause()`, `audioSeek(time)`, `audioSetVolume(vol)`
- Watches `currentTrack` from store → replaces `src` and auto-plays
- Emits `timeupdate` → commits `SET_TIME` every 250 ms via `requestAnimationFrame`

### `durationMixin.js`
- Method: `formatDuration(seconds) → '3:47'`
- Used in `TrackRow`, `ProgressBar`, `PlayerBar`

### `keyboardMixin.js`
- Mounted on `App.vue` only
- Space → togglePlay, ← → seekTo(current - 10), → → seekTo(current + 10), M → mute

---

## Global Loading Plugin (`plugins/loading.js`)

```js
// Usage anywhere in the app:
this.$loading.show()
this.$loading.hide()
```

Internally dispatches `ui/showLoading` and `ui/hideLoading` to the Vuex store.
`GlobalLoader.vue` is rendered in `App.vue` and watches `store.state.ui.isLoading`.

---

## Design System

**Color palette (dark theme)**
```
--bg-base:    #0f0f0f
--bg-surface: #1a1a1a
--bg-card:    #222222
--accent:     #7c6af7      /* purple — primary interactive color */
--text-1:     #f0f0f0      /* primary text */
--text-2:     #9a9a9a      /* secondary / metadata */
--border:     #2e2e2e
```

**Typography**
- Font: `Inter` (Google Fonts CDN), weights 400 / 500 / 600
- Scale: 12 / 14 / 16 / 20 / 28px

**Spacing scale**: 4 / 8 / 12 / 16 / 24 / 32 / 48px

**Components**
- Buttons: rounded-full, no border, accent background, 0.15s ease transitions
- Cards: `bg-card` background, 12px radius, subtle border
- Sliders (progress / volume): custom-styled `<input type="range">`, accent thumb color

---

## vite.config.js

```js
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  }
})
```

---

## package.json scripts

```json
"scripts": {
  "dev":   "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## Development Setup

```bash
cd vue-migrate
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Key Conventions

- Options API throughout (Vue 2 style) — no `<script setup>`
- Mixins are imported per-component, not globally registered
- All Vuex mutations are SCREAMING_SNAKE_CASE
- All components use `name:` option (aids Vue Devtools)
- Scoped SCSS in every component; global tokens via `additionalData` injection
- No TypeScript — plain JS with JSDoc comments where helpful
- Audio source: use free CC0 tracks from pixabay or local files in `public/audio/`
