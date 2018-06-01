<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs11>
        <div>
          <v-card-text>
            <h1 class="white--text text-md-center display-1">آیین یادبود فارغ‌التحصیلی دانشجویان ورودی ۱۳۹۳</h1>
          </v-card-text>
          <v-card-text>
            <h6 class="white--text text-xs-center subheading">دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر</h6>
          </v-card-text>
          <v-card-text class="justify-content-center">
            <p v-if="this.code" class="white--text text-xs-center">در حال ورود...</p>
            <div class="text-xs-center">
              <v-btn large outline color="success" class="text-xs-center" @click="attemptLogin(true)" :disabled="this.code">ورود به سایت</v-btn>
            </div>
          </v-card-text>

        </div>
      </v-flex>
      <!--<v-flex xs12 sm8 md4>-->
        <!--<v-card class="elevation-12" justify-center>-->
          <!--<v-card-title class="blue darken-1 white&#45;&#45;text justify-content-center">-->
            <!--<span class="title">ورود به حساب</span>-->
          <!--</v-card-title>-->
          <!--<v-card-text>-->
            <!--<v-form v-model="valid" lazy-validation="" ref="login">-->
              <!--<v-text-field v-model="username"-->
                            <!--label="شماره دانشجویی"-->
                            <!--light-->
                            <!--:rules="userRules"-->
                            <!--required-->
                            <!--@keyup.enter="submit"-->
                            <!--id="username"-->
                            <!--prepend-icon="mdi-account"-->
                            <!--type="text"-->
              <!--&gt;</v-text-field>-->
              <!--<v-text-field v-model="password"-->
                            <!--label="رمز عبور"-->
                            <!--class="pt-3"-->
                            <!--light-->
                            <!--:rules="passRules"-->
                            <!--required-->
                            <!--type="password"-->
                            <!--@keyup.enter="submit"-->
                            <!--id="password"-->
                            <!--prepend-icon="mdi-textbox-password"-->
              <!--&gt;</v-text-field>-->
            <!--</v-form>-->
          <!--</v-card-text>-->
          <!--<v-card-actions class="d-flex justify-content-center">-->
              <!--<v-btn-->
                <!--class="success"-->
                <!--@click="submit"-->
              <!--&gt;-->
                <!--وارد شوید-->
              <!--</v-btn>-->
          <!--</v-card-actions>-->
        <!--</v-card>-->
      <!--</v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    layout: 'login',
    computed: {
      code () {
        return this.$route.query.code
      }
    },
    data() {
      return {
        username: '',
        password: '',
        valid: '',
        userRules: [
          v => !!v || 'لطفا نام کاربری را وارد کنید.',
        ],
        passRules: [
          v => !!v || 'لطفا رمز عبور را وارد کنید.',
        ]
      }
    },
    notifications: {
      showLoginError: {
        title: 'خطای ۴۰۱: شماره دانشجویی و یا رمز عبور اشتباه است.',
        type: 'error'
      },
      showOtherError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      }
    },
    methods: {
      async submit() {
        if (this.$refs.login.validate()) {
          this.$auth.loginWith('local', {data: {
              username: this.username,
              password: this.password,
            }}).catch(e => {
              const status = e.response.data.statusCode
              if (status == 401)
                this.showLoginError()
              else
                this.showOtherError()
            })
        }
      },
      attemptLogin(callback) {
        if (!this.$auth.loggedIn) {
          if (this.code) {
            this.$auth.login({data: {code: this.code}, url: '/oauth/aut/authorize'})
          } else if(callback) {
            this.$store.dispatch('redirectToLogin')
          }
        }
      }
    },
    async mounted () {
      this.attemptLogin(false)
    }
  }
</script>

<style scoped>

</style>
