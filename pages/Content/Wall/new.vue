<template>
  <new-post :people="prettyPeople"></new-post>
</template>

<script>
  import NewPost from '~/components/Content/Posts/NewPost.vue'

  export default {
    name: "index",
    layout: 'content',
    components: {NewPost},
    computed: {
      prettyPeople() {
        let res = []
        for (let person of this.people){
          person.name = this.$persianJS.arabicChar(person.name)
          person.avatar = this.$helper.avatar(person)
          res.push(person)
        }
        res = this.$helper.sortBy(res, 'std_numbers')
        console.log(res)
        return res
      }
    },
    asyncData(context){
      return context.$axios.get('users/students')
        .then(e => {
          return {people: e.data}
        }).catch(e => {
          context.error({ statusCode: 500, message: 'خطای سرور...' })
        })
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
