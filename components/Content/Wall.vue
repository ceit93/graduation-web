<template>
  <v-card>
    <v-card-title class="justify-content-center">
      <v-btn icon :to="'/content/wall/' + this.user.username" nuxt>
        <v-avatar :size="40" class="elevation-2">
          <!--TODO: Implement the avatar-->
          <img src="@/static/avatar.png" alt="">
        </v-avatar>
      </v-btn>
      <h3 class="title">دیوارِ {{user.name}}</h3>
    </v-card-title>
    <v-card-text>
      <h2 v-if="user.posts === null || user.posts.length === 0" class="grey--text text-xs-center">ای بابا :(</h2>
      <h4 v-if="user.posts === null || user.posts.length === 0" class="grey--text text-xs-center">هنوز کسی روی دیوار {{user.name}} دل‌نوشته‌ای ننوشته...</h4>
      <div v-for="(post,index) in user.posts"
           :key="index">
        <post
          :postData="post"
          :belongsToLoggedInUser="access"
          @approved="approvePost(post._id, index)"
          @removeMe="removePost(post._id, index)"
          @disapproved="disapprovePost(post._id, index)"/>
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
      computed: {
        access() {
          return this.user.username === this.$auth.user.username
        }
      },
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
        approvePost(id, index){
          this.$axios.post('/posts/' + id, {approved: true})
            .then(e => {
            this.showApprovingSuccess()
            user.posts[index].approved = true
          }).catch(r => {
            this.showError()
          })
        },
        async disapprovePost(id, index){
          await this.$axios.post('/posts/' + id, {approved: false}).then(e => {
            this.showApprovingSuccess()
            user.posts[index].approved = true
          }).catch(r => {
            this.showError()
          })
        },
        async removePost(index) {
          if (this.posts[index].user._id === this.$auth.user._id) {
            if (window.confirm("آیا مطمئن هستید؟")) {
              this.$axios.delete('/posts/' + id).then(e => {
                this.posts.splice(index, 1);
                this.showDeletionSuccess()
                this.$nuxt.$router.replace({'path': '/content/wall/'})
              }).catch(r => {
                this.showError()
              })
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
