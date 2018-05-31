<template>
  <div class="mb-3">
    <v-card class="elevation-5">
      <v-card-title primary-title>
        <v-btn icon to="" nuxt>
          <v-avatar :size="40" class="elevation-2">
            <!--TODO: Implement the avatar-->
            <img src="avatar.png" alt="">
          </v-avatar>
        </v-btn>
        <span class="mr-2 body-2">{{postData.title}} - برای &nbsp;</span>
        <span>
          <nuxt-link to="">{{postData.to.name}}</nuxt-link>
        </span>
        <span v-if="postData.approved && postData.user.username !== username">
          <v-chip color="green" text-color="white" small>تایید شده</v-chip>
        </span>
        <span v-if="!postData.approved && postData.user.username !== username">
          <v-chip color="orange" outline small dark>در انتظار تایید</v-chip>
        </span>
        <v-spacer></v-spacer>
        <span class="grey--text text--lighten-1">
            {{postData.date | moment('HH:MM jYYYY/jMM/jD') | makeParsi}}
        </span>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>more_horiz</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="postData.approved && postData.to.username === username" @click="dissaprovePost">
              <v-list-tile-title class="red--text">عدم تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="!postData.approved && postData.to.username === username" @click="approvePost">
              <v-list-tile-title class="green--text">تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="postData.user.username === username" @click="deletePost">
              <v-list-tile-title class="red--text">حذف پست</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div style="text-align:justify;">
          {{postData.body}}
        </div>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import persianJS from 'persianjs';
  import Comment from '@/components/Comment.vue'

  export default {
    props: ['postData'],
    name: "post",
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return persianJs(value.toString()).englishNumber().toString();
      }
    },
    computed: {
      username() {
        return this.$auth.user.username
      }
    },
    methods: {
      deletePost() {
        if (this.postData.user.username === this.$auth.user.username){
          console.log("deleted")
          this.$emit('removeMe')
        }
      },
      approvePost() {
        if (postData.to.username === this.$auth.user.username){
          console.log("approved")
          postData.approved = true
        }
      },
      dissaprovePost() {
        if (postData.to.username === this.$auth.user.username){
          console.log("DISapproved")
          postData.approved = false
        }
      }
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>

</style>
