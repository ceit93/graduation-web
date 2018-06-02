<template>
  <v-card>
    <v-card-title class="justify-content-center">
      <v-btn icon :to="'/content/wall/' + user.username" nuxt>
        <v-avatar :size="40" class="elevation-2">
          <!--TODO: Implement the avatar-->
          <img src="@/static/avatar.png" alt="">
        </v-avatar>
      </v-btn>
      <h3 class="title">دیوارِ {{user.name}}</h3>
    </v-card-title>
    <v-card-text>
      <div v-for="(post,index) in user.posts"
           :key="index">
        <post :postData="post" @approved="approvePost(index)" @disapproved="disapprovePost(index)"/>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
    import Post from '~/components/Content/Posts/Post.vue'
    export default {
      components: {Post},
      props: ['user'],
      name: "wall",
      notifications: {
        showError: {
          title: 'خطا',
          message: 'خطایی رخ داد...',
          type: 'error'
        },
        showApprovingSuccess: {
          title: 'انجام شد',
          message: 'دل‌نوشته روی دیوار شما نمایش داده می‌شود.',
          type: 'success'
        },
        showDisapprovingSuccess: {
          title: 'انجام شد',
          message: 'دل‌نوشته روی دیوار شما نمایش داده نمی‌شود.',
          type: 'success'
        }
      },
      methods: {
        approvePost(index){
          user.posts[index].approved = true
          // Posting - TODO: complete this
          // this.$axios.post('/posts/' + this.posts[index]._id, {data: this.posts[index]}).then(e => {
          this.showApprovingSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
        },
        disapprovePost(index){
          user.posts[index].approved = false
          // Posting - TODO: complete this
          // this.$axios.post('/posts/' + this.posts[index]._id, {data: this.posts[index]}).then(e => {
          this.showDisapprovingSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
        }
      }
    }
</script>

<style scoped>

</style>
