<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row class="mx-0">
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap class="mt-5 light-blue--text text--darken-3 mx-0">
          <v-flex xs12 md3 class="text-xs-center">
            <avatar></avatar>
          </v-flex>
          <v-flex xs12 md9 class="ceit-identity-text">
            <div class="mx-3">
              <h1 class="iranblack">{{ this.$persianJS.userName(this.$auth.user) }}</h1>
              <h3 class="iranblack">خوش اومدی!</h3> <br>
              <p>اینجا سایت فارغ‌التحصیلی ما ۹۳‌ای‌هاس و با همین وب‌اپلیکیشن باید مطالب نشریه رو کامل کنیم و بخشی از کارای جشن
                رو انجام بدیم.</p>
              <p>لطفا تا قبل از موعد تکمیل محتوا (۳۱ خرداد)، مطالب مربوط به نشریه و پروفایل و ترین‌ها و ... رو کامل
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
  import Avatar from "./Avatar";
  export default {
    components: {Avatar},
    name: "Identity",
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
