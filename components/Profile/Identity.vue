<template>
  <v-container fluid fill-height class="grey lighten-5">
    <v-layout align-center justify-center row>
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap class="ltr mt-5 iranblack light-blue--text text--darken-3">
          <v-flex xs4 class="text-xs-center">
            <v-avatar
              :tile="false"
              :size="150"
              color="grey lighten-4"
            >
              <!--TODO: IMPLEMENT USER AVATAR-->
              <img src="avatar.png" :alt="this.$auth.user.name">
            </v-avatar><br>
            <v-btn small>
              تغییر عکس
            </v-btn>
          </v-flex>
          <v-flex xs8 class="">
            <h1 class="">هم‌ورودی عزیز، {{ this.$auth.user.name }}</h1>
            <p>لطفا تا تموم نشدن وقت (۳۱ خرداد) مطالب مربوط به نشریه و پروفایل و ترین‌ها و ... رو کامل کنید.</p>
            <p>اینجا رو هم تند تند چک کنید لطفا چون مرتب آپدیت می‌کنیمش!</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "Identity"
    }
</script>

<style scoped>

</style>
