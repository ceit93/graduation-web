<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row class="mx-0">
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap class="ltr mt-5 iranblack light-blue--text text--darken-3 mx-0">
          <v-flex xs12 md3 class="text-xs-center">
            <v-avatar
              :tile="false"
              :size="150"
              color="grey lighten-4"
            >
              <img
                v-show="!loading"
                :src="avatarSrc"
                :alt="this.$auth.user.name">
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
            <h1 class="mb-2">هم‌ورودی عزیز، {{ this.$persianJS.arabicChar(this.$auth.user.name) }}</h1>
            <p>اینجا سایت فارغ‌التحصیلیمونه و از طریق این وب‌اپلیکیشن باید مطالب نشریه رو کامل کنیم و بخشی از کارای جشن
              رو انجام بدیم.</p>
            <p>لطفا تا تموم قبل از موعد تکمیل محتوا (۳۱ خرداد)، مطالب مربوط به نشریه و پروفایل و ترین‌ها و ... رو کامل
              کنید.</p>
            <p>اینجا رو هم تند تند چک کنید لطفا چون مرتب آپدیت می‌کنیمش!</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import persianJS from '~/node_modules/persianjs'
  export default {
    data() {
      return {
        avatar: '',
        avatarSrc: '',
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
        }).then((res) => {
          this.avatarSrc = res.data.avatar;
          this.loading = false;
        });

      }
    },
    created() {
      this.avatarSrc = this.$auth.user.avatar
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
