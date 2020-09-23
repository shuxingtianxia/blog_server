<template>
  <div class="app-wrapper" :class="{ hideSidebar: !sidebar.opened }">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
    </div>
    123
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
    // TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container{
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 200px;
}
</style>
