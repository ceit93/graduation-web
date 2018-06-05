<template>
  <v-card>
    <v-card-title class="justify-content-center">
      <v-btn icon :to="'/content/wall/' + this.user.username" nuxt>
        <v-avatar :size="40" class="elevation-2">
          <img :src="this.$helper.avatar(user)"
               :alt="this.$persianJS.arabicChar(user.name)">
        </v-avatar>
      </v-btn>
      <h3 class="title">دیوارِ {{this.$persianJS.arabicChar(user.name)}}</h3>
    </v-card-title>
    <v-card-text>
      <h2 v-if="canHaveWall && (user.posts === null || user.posts.length === 0)" class="grey--text text-xs-center">ای بابا :(</h2>
      <p v-if="canHaveWall && (user.posts === null || user.posts.length === 0)" class="grey--text text-xs-center">هنوز کسی روی دیوار {{user.name}} دل‌نوشته‌ای ننوشته.
        <nuxt-link to="/content/wall/new">دل‌نوشته جدید</nuxt-link>
        بنویسید...
      </p>
      <h2 v-if="!canHaveWall" class="grey--text text-xs-center">کاربر مورد نظر ۹۳ای نیست :(</h2>
      <p v-if="!canHaveWall" class="grey--text text-xs-center">امکان داشتن دیوار دل‌نوشته‌ها رو فقط ۹۳ای‌ها دارن. می‌تونید رو دیوار ۹۳‌ای‌ها براشون دل‌نوشته بنویسید. برای این‌کار به صفحه
        <nuxt-link to="/content/wall/new">دل‌نوشته جدید</nuxt-link>
        مراجعه کنید.</p>
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
          for (let number of this.user.std_numbers) {
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
