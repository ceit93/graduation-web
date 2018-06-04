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
      <h2 v-if="canHaveWall && user.posts === null || user.posts.length === 0" class="grey--text text-xs-center">ای بابا :(</h2>
      <h4 v-if="canHaveWall && user.posts === null || user.posts.length === 0" class="grey--text text-xs-center">هنوز کسی روی دیوار {{user.name}} دل‌نوشته‌ای ننوشته...</h4>
      <h2 v-if="!canHaveWall" class="grey--text text-xs-center">شما ۹۳ای نیستید :(</h2>
      <h4 v-if="!canHaveWall" class="grey--text text-xs-center">امکان داشتن دیوار دل‌نوشته‌ها رو فقط ۹۳ای‌ها دارن. درعوض، شما می‌تونین رو دیوار ۹۳‌ای‌ها براشون دل‌نوشته بنویسید. برای این‌کار می‌تونید به صفحه دل‌نوشته جدید مراجعه کنید.</h4>
      <div v-if="canHaveWall" v-for="(post,index) in user.posts"
           :key="index">
        <post
          :postData="post"
          :belongsToLoggedInUser="access"
          @approved="approved(index)"
          @deleted="removed(index)"
          @disapproved="disapproved(index)"/>
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
        },
        canHaveWall() {
          for (let number of this.$auth.user.std_numbers) {
            if (number.match('^9331[0-9]{3}$'))
              return true
          }
          return false
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
        approved(index){
          this.$emit('approved', index)
        },
        disapproved(index){
          this.$emit('disapproved', index)
        },
        removed(index) {
          this.$emit('deleted', index)
        }
      },
    }
</script>

<style scoped>

</style>
