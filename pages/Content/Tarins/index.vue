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
      //TODO: remove this
      fetch ({ store, redirect }) {
        return redirect('/landing')
      },
    }
</script>

<style scoped>

</style>
