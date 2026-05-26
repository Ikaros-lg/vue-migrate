<template>
  <div id="app">
    <AppShell />
    <GlobalLoader />
  </div>
</template>

<script>
import AppShell from '@/components/layout/AppShell.vue'
import GlobalLoader from '@/components/ui/GlobalLoader.vue'
import keyboardMixin from '@/mixins/keyboardMixin'

export default {
  name: 'App',
  components: { AppShell, GlobalLoader },
  mixins: [keyboardMixin]
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
