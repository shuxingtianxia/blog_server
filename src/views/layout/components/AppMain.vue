<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :include="cachedViews"> -->
      <!-- <keep-alive> -->
        <router-view :key="this.$route.name"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>

