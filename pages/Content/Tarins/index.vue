<template>
  <tarins :votes="this.votes" :people="this.prettyPeople"></tarins>
</template>

<script>
    import Tarins from "~/components/Content/Tarins/Tarins";
    export default {
      name: "index",
      components: {Tarins},
      layout: 'content',
      computed: {
        prettyPeople() {
          let res = []
          for (let person of this.people){
            person.name = this.$persianJS.arabicChar(person.name)
            person.avatar = this.$helper.avatar(person)
            res.push(person)
          }
          res = this.$helper.sortBy(res, 'std_numbers')
          return res
        }
      },
      async asyncData (context) {
        let {people} = await context.$axios.get('/users/students')
          .then((res) => {
            return { people: res.data }
          }).catch(e => {
            context.error({statusCode: 500, message: 'خطای سرور...'})
          })
        let {votes} = await context.$axios.get('/polls')
          .then(e => {
            return {votes: e.data}
          }).catch(e => {
              context.error({statusCode: 500, message: 'خطای سرور...'})
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
