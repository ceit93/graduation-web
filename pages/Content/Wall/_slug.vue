<template>
  <wall :user="user"></wall>
</template>

<script>
  import Wall from "~/components/Content/Wall";
  export default {
    name: "_slug",
    layout: 'content',
    components: {Wall},
    computed: {
      user(){
        return this.$auth.user
      }
    },
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
