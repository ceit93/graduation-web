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
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            :href="info.redirect_uri"
            :flat="this.$helper.isValid(this.code)"
            :loading="this.$helper.isValid(this.code)"
            large class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
            dark
            color="grey darken-4">ورود</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    layout: 'landing',
    name: 'login',
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

