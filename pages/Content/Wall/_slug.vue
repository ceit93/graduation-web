<template>
  <wall :user="user"></wall>
</template>

<script>
  import Wall from "~/components/Content/Wall";
  export default {
    name: "slug",
    layout: 'content',
    asyncData (context) {
      return context.$axios.get(`users/${context.params.slug}`)
        .then((res) => {
          console.log("USER IS:")
          console.log(res.data)
          return { user: res.data.user }
        }).catch(e => {
          console.log('error')
          console.log({name: 'خل و چل'})
        })
    },
    components: {Wall},
    async mounted() {
      this.$vuetify.goTo('#tabs', {
        duration: 300,
        offset: -100,
        easing: 'easeInOutCubic'
      })
    },
  }
</script>

<style scoped>

</style>
