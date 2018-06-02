<template>
  <posts></posts>
</template>

<script>
  import Posts from '~/components/Content/Posts/Posts.vue'

  export default {
    name: "index",
    layout: 'content',
    components: {Posts},
    mounted() {
      this.$vuetify.goTo('#tabs', {
        duration: 300,
        offset: -100,
        easing: 'easeInOutCubic'
      })
    }
  }
</script>

<style scoped>
</style>
