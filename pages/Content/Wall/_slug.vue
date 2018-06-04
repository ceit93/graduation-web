<template>
  <wall :user="user"
      @approved="approvePost"
      @deleted="removePost"
      @disapproved="disapprovePost"></wall>
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
    methods: {
      approvePost(index){
        console.log(index)
        this.user.posts[index].approved = true
      },
      disapprovePost(index){
        console.log(index)
        this.user.posts[index].approved = false
      },
      removePost(index) {
        console.log(index)
        this.user.posts.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
