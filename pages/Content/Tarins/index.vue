<template>
  <tarins :votes="this.votes" :people="this.people"></tarins>
</template>

<script>
    import Tarins from "~/components/Content/Tarins/Tarins";
    export default {
      name: "index",
      components: {Tarins},
      layout: 'content',
      data() {
        return {
          votes: [],
          people: []
        }
      },
      async asyncData (context) {
        let {people} = await context.$axios.get('/users/students')
          .then((res) => {
            return { people: res.data }
          }).catch(e => {
            console.log('error')
            return []
          })
        let {votes} = await context.$axios.get('/polls')
          .then(e => {
          return {votes: e.data}
        }).catch(e => {
          console.log('error')
          return []
        })
        return {
          votes: votes,
          people: people
        }
      },
      mounted() {
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
