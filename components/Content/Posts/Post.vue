<template>
  <div class="mb-3">
    <v-card class="elevation-5">
      <v-card-title primary-title>
        <v-dialog v-model="dialog2" max-width="40vw">
          <v-btn icon slot="activator">
            <v-avatar :size="40" class="elevation-2">
              <img :src="this.$helper.avatar(postData.user)"
                   :alt="this.$persianJS.arabicChar(postData.user.name)">
            </v-avatar>
          </v-btn>
          <v-card>
            <v-card-media :src="this.$helper.avatar(postData.user)" height="40vw">
              <v-layout column class="media">
                <v-card-title>
                  <v-btn dark icon @click.native="dialog2 = false">
                    <v-icon color="info">chevron_right</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn dark icon class="mr-3" nuxt :to="postData.user.username">
                    <v-icon color="info">account_circle</v-icon>
                  </v-btn>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="text-xs-center hidden-xs-only justify-content-center">
                  <h1 class="text-xs-center blue--text iranblack">{{this.$persianJS.arabicChar(postData.user.name)}}</h1>
                </v-card-title>
              </v-layout>
            </v-card-media>
          </v-card>
        </v-dialog>
        <h1 class="mr-2 iranblack">{{postData.title}}</h1>
        <span v-if="postData.approved && (postData.user.username !== this.username || canDelete)">
          <v-dialog v-model="dialog">
            <v-chip color="info" text-color="white" slot="activator" @click.native.stop="dialog = true" small>
              <v-icon small>check</v-icon>
              تایید شده (؟)
            </v-chip>
            <v-card>
              <v-card-text>
                <p class="green--text">این دل‌نوشته تایید شده که یعنی در صفحه مربوط به شما در نشریه یادبود فارغ‌التحصیلی چاپ میشه و همچنین روی دیوار شما برای عموم قابل نمایشه.</p>
                <p>عملیات مربوط به هر دل‌نوشته رو می‌تونید از منوی سمت چپ هر دل‌نوشته انجام بدید:</p>
                <p>
                  <v-icon color="info" small>check</v-icon>
                  اگر دل‌نوشته‌ای رو تایید کنید، تو صفحه مربوط به شما در نشریه یادبود فارغ‌التحصیلی میاد و روی دیوارتون نمایش داده می‌شه.
                </p>
                <p>
                  <v-icon color="warning" small>clear</v-icon>&nbsp;
                  اگر دل‌نوشته‌ای در حالت انتظار بمونه و تایید نشه، توی نشریه نمیاد و فقط نویسنده و گیرنده (کسی که دل‌نوشته براش نوشته شده) می‌تونن اون رو ببینن.</p>
                <p>
                  <v-icon color="error" small>delete</v-icon>&nbsp;
                  فقط هم نویسنده اجازه پاک کردن یک دل‌نوشته رو داره و در صورت پاک کردن، عملیات قابل بازگشت نیست.</p>
              </v-card-text>
              <v-card-actions class="d-flex justify-content-center">
                <v-btn color="info" large @click.native="dialog = false">باشه</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>
        <span v-if="!postData.approved && (postData.user.username !== this.username || canDelete)">
          <v-dialog v-model="dialog">
            <v-chip color="orange" outline dark slot="activator" @click.native.stop="dialog = true" small>در انتظار تایید (؟)</v-chip>
            <v-card>
              <v-card-text>
                <p class="orange--text">این دل‌نوشته تایید نشده. به این معنی که توی صفحه مربوط به شما در نشریه یادبود فارغ‌التحصیلی، چاپ نخواهد شد. ولی شما کماکان می‌تونید اون رو روی دیوارتون ببینید.</p>
                <p>عملیات مربوط به هر دل‌نوشته رو می‌تونید از منوی سمت چپ هر دل‌نوشته انجام بدید.</p>
                <p>
                  <v-icon color="success" small>check</v-icon>
                  اگر دل‌نوشته‌ای رو تایید کنید، تو صفحه مربوط به شما در نشریه یادبود فارغ‌التحصیلی میاد و روی دیوارتون نمایش داده می‌شه.
                </p>
                <p>
                  <v-icon color="warning" small>clear</v-icon>&nbsp;
                  اگر دل‌نوشته‌ای در حالت انتظار بمونه و تایید نشه، توی نشریه نمیاد و فقط نویسنده و گیرنده (کسی که دل‌نوشته براش نوشته شده) می‌تونن اون رو ببینن.</p>
                <p>
                  <v-icon color="error" small>delete</v-icon>&nbsp;
                  فقط هم نویسنده اجازه پاک کردن یک دل‌نوشته رو داره و در صورت پاک کردن، عملیات قابل بازگشت نیست.</p>
              </v-card-text>
              <v-card-actions class="d-flex justify-content-center">
                <v-btn color="info" large @click.native="dialog = false">باشه</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>
        <v-spacer></v-spacer>
        <span class="grey--text text--lighten-1">
            {{postData.date | moment('HH:MM jYYYY/jMM/jD') | makeParsi}}
        </span>


        <v-tooltip top class="hidden-xs-only" v-if="canApprove">
          <v-btn icon small fab class="hidden-xs-only" v-if="canApprove" slot="activator" color="success"  @click="approvePost" alt="تایید">
            <v-icon>check</v-icon>
          </v-btn>
          <span>تایید دل‌نوشته</span>
        </v-tooltip>


        <v-tooltip top class="hidden-xs-only" v-if="canDisapprove">
          <v-btn icon small fab class="hidden-xs-only" v-if="canDisapprove" slot="activator" color="warning"  @click="dissaprovePost" alt="عدم تایید">
            <v-icon>clear</v-icon>
          </v-btn>
          <span>عدم تایید دل‌نوشته</span>
        </v-tooltip>

        <!--<v-tooltip top class="hidden-xs-only" v-if="canDelete"> TODO: complete the functionality-->
          <!--<v-btn icon small fab :to="'/content/wall/edit/' + postData._id" nuxt class="hidden-xs-only" v-if="canDelete" slot="activator" color="info" alt="ویرایش دل‌نوشته">-->
            <!--<v-icon>edit</v-icon>-->
          <!--</v-btn>-->
          <!--<span>ویرایش دل‌نوشته</span>-->
        <!--</v-tooltip>-->

        <v-tooltip top class="hidden-xs-only" v-if="canDelete">
          <v-btn icon small fab class="hidden-xs-only" v-if="canDelete" slot="activator" color="error" @click="deletePost" alt="حذف دل‌نوشته">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>حذف دل‌نوشته</span>
        </v-tooltip>

        <v-menu bottom left class="hidden-sm-and-up">
          <v-btn slot="activator" icon>
            <v-icon>more_horiz</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-if="canApprove"
              @click="approvePost">
              <v-list-tile-title class="green--text">تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-if="canDisapprove"
              @click="dissaprovePost">
              <v-list-tile-title class="orange--text">عدم تایید</v-list-tile-title>
            </v-list-tile>
            <!--<v-list-tile TODO: complete the functionality-->
              <!--v-if="canDelete">-->
              <!--<v-list-tile-title class="blue&#45;&#45;text">-->
                <!--<nuxt-link :to="'/content/wall/edit/' + postData._id">ویرایش دل نوشته</nuxt-link>-->
              <!--</v-list-tile-title>-->
            <!--</v-list-tile>-->
            <v-list-tile
              v-if="canDelete"
              @click="deletePost">
              <v-list-tile-title class="red--text">حذف دل‌نوشته</v-list-tile-title>
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
          <span class="iranblack">{{this.$persianJS.arabicChar(postData.user.name)}}</span>:
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
    data(){
      return {
        dialog: false,
        dialog2: false
      }
    },
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
        message: 'دل‌نوشته مورد نظر حذف شد.',
        type: 'success'
      }
    },
    methods: {
      deletePost() {
        if (this.canDelete){
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
        }
      },
      async approvePost() {
        if (this.canApprove) {
          this.$axios.post('/posts/' + this.postData._id, {data: {approved: true}})
            .then(e => {
              this.showApprovingSuccess()
              this.$emit('approved')
            }).catch(e => {
            this.showError()
            console.log(e)
          })
        }
      },
      dissaprovePost() {
        if (this.canDisapprove){
          this.$axios.post('/posts/' + this.postData._id, {data: {approved: false}})
            .then(e => {
              this.showDisapprovingSuccess()
              this.$emit('disapproved')
            }).catch(e => {
            this.showError()
            console.log(e)
          })
        }
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
