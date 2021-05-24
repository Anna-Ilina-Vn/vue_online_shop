<template>
  <div class="v-main-wrapper">
    <v-header />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer />
  </div>
</template>

<script>
  import vHeader from './layouts/v-header'
  import vFooter from './layouts/v-footer'

  export default {
    name: 'v-main-wrapper',
    components: {
      vHeader,
      vFooter
    },
    data() {
      return {
        title: 'Main wrapper'
      }
    },
  }
</script>

<style>
  .v-main-wrapper {
    margin: 0 auto;
  }
</style>
