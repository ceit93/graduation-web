<template>
  <div class="mb-3">
    <v-card class="elevation-5">
      <v-card-title primary-title>
        <v-btn icon :to="'/content/wall/' + postData.user.username" nuxt>
          <v-avatar :size="40" class="elevation-2">
            <!--TODO: Implement the avatar-->
            <img src="@/static/avatar.png" alt="">
          </v-avatar>
        </v-btn>
        <span class="mr-2 body-2">{{postData.title}}</span>
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
            <v-list-tile
              v-if="canDisapprove"
              @click="dissaprovePost">
              <v-list-tile-title class="red--text">عدم تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-if="canApprove"
              @click="approvePost">
              <v-list-tile-title class="green--text">تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-if="canDelete"
              @click="deletePost">
              <v-list-tile-title class="red--text">حذف پست</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider/>
      <img v-if="postData.image"
           :src="postData.image"
           class="ceit-post-image">

      <v-card-text>
        <div style="text-align:justify;" class="pa-2">
          {{postData.body}}
        </div>
      </v-card-text>
      <div style="clear: both"></div>
    </v-card>

  </div>
</template>

<script>
  export default {
    props: ['postData', 'belongsToLoggedInUser'],
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
      },
      canDelete() {
        return this.postData.user.username === this.$auth.user.username
      },
      canApprove() {
        return !this.postData.approved && this.belongsToLoggedInUser
      },
      canDisapprove() {
        return this.postData.approved && this.belongsToLoggedInUser
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
      },
      showDeletingSuccess: {
        title: 'انجام شد',
        message: 'دل‌نوشته روی دیوار شما نمایش داده نمی‌شود.',
        type: 'success'
      }
    },
    methods: {
      deletePost() {
        if (this.postData.user.username === this.$auth.user.username) {
          if (window.confirm("آیا مطمئن هستید؟")) {
            this.$axios.delete('/posts/' + this.postData._id)
              .then(e => {
                this.showDeletingSuccess()
                this.$emit('deleted')
              }).catch(e => {
                this.showError()
                console.log(e)
            })
          }
        }
      },
      async approvePost() {
        this.$axios.post('/posts/' + this.postData._id, {data: {approved: true}})
          .then(e => {
            this.showApprovingSuccess()
            this.$emit('approved')
          }).catch(e => {
            this.showError()
            console.log(e)
          })
      },
      dissaprovePost() {
        this.$axios.post('/posts/' + this.postData._id, {data: {approved: false}})
          .then(e => {
            this.showDisapprovingSuccess()
            this.$emit('disapproved')
          }).catch(e => {
            this.showError()
            console.log(e)
          })
      }
    },
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .ceit-post-image {
      width: 100%;
      float: none;
      margin: 0;
      padding: 10px;
    }
  }

  @media (min-width: 768px) {
    .ceit-post-image {
      width: 400px;
      float: left;
      padding: 16px;
    }
  }
</style>
