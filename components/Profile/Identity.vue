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
              <p>به جامعه دانش‌آموختگان ورودی ۱۳۹۱ کارشناسی دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر خوش آمدید!</p>
              <p>اینجا رو مثل فیسبوک یا سایر شبکه‌های اجتمعی بدونید و خونه خودتون حسابش کنید!</p>
              <p>تند تند هم چک کنید لطفا چون مرتب آپدیت می‌کنیمش!</p>
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
