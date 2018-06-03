<template>
  <tarins></tarins>
</template>

<script>
    import Tarins from "~/components/Content/Tarins/Tarins";
    export default {
      name: "index",
      components: {Tarins},
      layout: 'content',
      mounted() {
        this.$vuetify.goTo('#tabs', {
          duration: 300,
          offset: -100,
          easing: 'easeInOutCubic'
        })
      },
      middleware: 'redirect-to-landing' // TODO remove this
    }
</script>

<style scoped>

</style>
