<template>
  <v-card>
    <v-card-title class="justify-content-center">
      <v-dialog v-model="dialog" max-width="40vw">
        <v-btn icon slot="activator">
          <v-avatar :size="40" class="elevation-2">
            <img :src="this.$helper.avatar(user)"
                 :alt="this.$persianJS.arabicChar(user.name)">
          </v-avatar>
        </v-btn>
        <v-card>
          <v-card-media :src="this.$helper.avatar(user)" height="40vw">
            <v-layout column class="media">
              <v-card-title>
                <v-btn dark icon @click.native="dialog = false">
                  <v-icon color="info">chevron_right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3" nuxt :to="user.username">
                  <v-icon color="info">account_circle</v-icon>
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="text-xs-center hidden-xs-only justify-content-center">
                <h1 class="text-xs-center blue--text iranblack">{{this.$persianJS.arabicChar(user.name)}}</h1>
              </v-card-title>
            </v-layout>
          </v-card-media>
        </v-card>
      </v-dialog>
      <h3 class="title iranblack">دیوارِ {{this.$persianJS.arabicChar(user.name)}}</h3>
    </v-card-title>
    <v-card-text>
      <h2 v-if="this.canHaveWall && (user.posts === null || user.posts.length === 0)" class="grey--text text-xs-center">ای بابا :(</h2>
      <p v-if="this.canHaveWall && (user.posts === null || user.posts.length === 0)" class="grey--text text-xs-center">هنوز کسی روی دیوار
        {{this.$persianJS.arabicChar(user.name)}}
        دل‌نوشته‌ای ننوشته.
        <nuxt-link to="/content/wall/new">دل‌نوشته جدید</nuxt-link>
        بنویسید...
      </p>
      <h2 v-if="!this.canHaveWall" class="grey--text text-xs-center">کاربر مورد نظر ۹۳ای نیست :(</h2>
      <p v-if="!this.canHaveWall" class="grey--text text-xs-center">امکان داشتن دیوار دل‌نوشته‌ها رو فقط ۹۳ای‌ها دارن. می‌تونید رو دیوار ۹۳‌ای‌ها براشون دل‌نوشته بنویسید. برای این‌کار به صفحه
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
      props: ['user', 'canHaveWall'],
      name: "wall",
      data() {
        return {
          dialog: false
        }
      },
      computed: {
        access() {
          return this.user.username === this.$auth.user.username
        },
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
