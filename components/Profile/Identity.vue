<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row class="mx-0">
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap class="ltr mt-5 light-blue--text text--darken-3 mx-0">
          <v-flex xs12 md3 class="text-xs-center">
            <v-avatar
              :tile="false"
              :size="150"
              color="grey lighten-4"
            >
              <img
                v-show="!loading"
                :src="this.$helper.avatar(this.$auth.user)"
                :alt="this.$persianJS.arabicChar(this.$auth.user.name)">
              <v-progress-circular
                v-show="loading"
                indeterminate
                color="primary"/>
            </v-avatar>
            <br>
            <input
              :v-model="avatar"
              name="image"
              type="file"
              ref="avatar"
              accept="image/*"
              style="display: none;"
              @change="uploadAvatar">
            <v-btn
              @click="changeAvatar"
              small>
              تغییر عکس
            </v-btn>
          </v-flex>
          <v-flex xs12 md9 class="ceit-identity-text">
            <div class="mx-3">
              <h1 class="iranblack">{{ this.$persianJS.arabicChar(this.$auth.user.name) }}</h1>
              <h3 class="iranblack">خوش اومدی!</h3> <br>
              <p>اینجا سایت فارغ‌التحصیلی ما ۹۳‌ای‌هاس و با همین وب‌اپلیکیشن باید مطالب نشریه رو کامل کنیم و بخشی از کارای جشن
                رو انجام بدیم.</p>
              <p>لطفا تا تموم قبل از موعد تکمیل محتوا (۳۱ خرداد)، مطالب مربوط به نشریه و پروفایل و ترین‌ها و ... رو کامل
                کنید.</p>
              <p>اینجا رو هم تند تند چک کنید لطفا چون مرتب آپدیت می‌کنیمش!</p>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        avatar: '',
        loading: false,
      }
    },
    name: "Identity",
    methods: {
      changeAvatar() {
        this.$refs.avatar.click();
      },
      uploadAvatar(e) {
        this.loading = true;
        this.avatar = e.target.files[0];
        let formData = new FormData();
        formData.append('user', this.$auth.user);
        formData.append('avatar', this.avatar);
        this.$axios.post('/profie', formData, {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(async(res) => {
          await this.$auth.fetchUser();
          this.loading = false;
          this.showUploadSuccess()
        }).catch(e => {
          this.showUploadFailure()
          console.log(e)
        });

      }
    },
    notifications: {
      showUploadSuccess: {
        title: 'چه عکسی!',
        message: 'آپلود عکس با موفقیت انجام شد.',
        type: 'success'
      },
      showUploadFailure: {
        title: 'خطا',
        message: 'خطایی رخ داد...',
        type: 'error'
      }
    }
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .ceit-identity-text p {
      text-align: center;
    }
  }

  @media (min-width: 768px) {
    .ceit-identity-text p {
      text-align: right;
    }
  }
</style>
