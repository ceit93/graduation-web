<template>
  <tarin-form></tarin-form>
</template>

<script>
    import TarinForm from "~/components/Content/Tarins/TarinForm"
    export default {
      name: "new",
      components: {TarinForm},
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
