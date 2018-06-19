<template>
  <v-content class="login-content">
    <v-container>
      <v-card flat class="transparent">
        <v-card-text class="text-xs-center">
          <div class="d-flex justify-content-center">
            <v-flex xs12 sm12 md5 style="flex: none !important;">
              <img src="/web-cover-min.png" width="100%"/>
            </v-flex>
          </div>
          <v-btn
            v-if="this.$auth.loggedIn || this.$helper.isValid(this.code)"
            flat
            to="/profile"
            nuxt
            large class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
            dark
            color="grey darken-4">ورود موفق. ادامه...</v-btn>
        </v-card-text>
        <v-card-text>
          <div class="d-flex justify-content-center">
            <v-btn
              :href="info.redirect_uri"
              :flat="this.$helper.isValid(this.code)"
              :loading="this.$helper.isValid(this.code)"
              large class="d-flex col-xs-12 col-sm-7 col-md-5 col-lg-4 col-xl-4"
              dark
              color="grey darken-4">ورود با شناسه یکتای امیرکبیر</v-btn>
          </div>
          <div class="d-flex justify-content-center">
            <v-btn
              v-if="!this.$auth.loggedIn && !this.$helper.isValid(this.code)"
              dark
              outline
              color="grey darken-4"
              @click="loginForm = !loginForm"
              class="d-flex col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">امیرکبیری نیستید؟</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog v-model="loginForm" max-width="400px">
      <v-card>
        <v-card-title class="blue darken-1 white--text justify-content-center">
          <span class="title">ورود به حساب</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit="submit" v-model="valid" lazy-validation>
            <v-text-field v-model="username"
                          label="نام کاربری"
                          light
                          :rules="userRules"
                          required
            >
            </v-text-field>

            <v-text-field v-model="password"
                          label="رمز عبور"
                          class="pt-3"
                          light
                          :rules="passRules"
                          required
                          type="password"
            >
            </v-text-field>
            <div class="d-flex justify-content-center">
              <v-btn
                class="success"
                type="submit"
                large
              >
                وارد شوید
              </v-btn>
            </div>
            <div class="d-flex justify-content-center text-xs-center">
              <a href="mailto:grad@ceit93.ir?Subject=Access Request&Body=با سلام. لطفا برای من در سایت جامعه فارغ‌التحصیلان ورودی ۱۳۹۳ دانشکده مهندسی کامپیوتر، دسترسی ایجاد کنید. نام و نام خانوادگی من، ایمیل من و ارتباطم با ورودی‌های ۱۳۹۳ به شرح زیر است:" class="text-xs-center">
                درخواست دسترسی
              </a>
            </div>

          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
  export default {
    layout: 'landing',
    name: 'Login',
    data() {
      return {
        loginForm: false,
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
    computed: {
      code () {
        return this.$route.query.code
      }
    },
    notifications: {
      showLoginError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      }
    },
    asyncData(context) {
      return context.$axios.get('/oauth/aut/login').then((res) => {
          return {info: res.data}
        }).catch(e => {
          context.error({ statusCode: 500, message: 'خطایی رخ داد...' })
        })
    },
    methods: {
      attemptLogin() {
        if (this.code) {
          this.$auth.login({data: {code: this.code}, url: '/oauth/aut/authorize'}).then(e => {
            this.$nuxt.$router.replace({'path' : '/'})
          }).catch(e => {
            this.onLoginError(e)
          })
        }
      },
      onLoginError(e) {
        this.showLoginError()
        this.$nuxt.$router.replace({'path' : '/login'})
        console.log(e)
      },
      async submit(e) {
        e.preventDefault()
        if (this.$refs.form.validate()) {
          try {
            await this.$auth.login({data: {
                username: this.username,
                password: this.password
              }, url: '/auth/login'})
            this.loginForm = false
            this.$nuxt.$router.replace({'path' : '/'})
          } catch (e) {
            this.showLoginError()
            this.$nuxt.$router.replace({'path' : '/'})
            console.log(e)
          }
        }
      }
    },
    async mounted () {
      this.attemptLogin(false)
    },
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .ceit-display-1 {
      font-size: 1.6rem;
    }
    .ceit-subheading {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    .ceit-display-1 {
      font-size: 2.3rem;
    }

    .ceit-subheading {
      font-size: 1.3rem;
    }
  }

  .login-content {
    background-color: #29b473;
  }
</style>
