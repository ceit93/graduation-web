<template>
  <v-content class="login-content">
    <div class="cover-bg">
      <img class="cover-img d-md-block" src="@/static/cover.png" alt="">
    </div>
    <v-container fluid >
      <v-layout align-center justify-center row class="mx-0">
        <v-flex xs11>
          <div>
            <v-card-text>
              <h1 class="white--text text-xs-center ceit-display-1">آیین یادبود فارغ‌التحصیلی دانشجویان ورودی ۱۳۹۳</h1>
            </v-card-text>
            <v-card-text>
              <h6 class="white--text text-xs-center ceit-subheading">دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر</h6>
            </v-card-text>
            <v-card-text class="justify-content-center">
              <p v-if="this.code != null" class="white--text text-xs-center">...در حال ورود</p>
              <div class="text-xs-center">
                <v-btn large outline color="success" class="text-xs-center" @click="attemptLogin(true)" :disabled="this.code != null">ورود به سایت</v-btn>
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
  </v-content>
</template>

<script>
  export default {
    layout: 'landing',
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
              this.showLoginError()
            })
        }
      },
      attemptLogin(callback) {
        if (!this.$auth.loggedIn) {
          if (this.code) {
            this.$auth.login({data: {code: this.code}, url: '/oauth/aut/authorize'}).then(e => {
              this.$nuxt.$router.replace({'path' : '/'})
            }).catch(e => {
              this.onLoginError(e)
            })
          } else if(callback) {
            try{
              this.$store.dispatch('redirectToLogin')
            } catch (e) {
              this.onLoginError(e)
            }
          }
        }
      },
      onLoginError(e) {
        this.showLoginError()
        console.log(e)
        this.$nuxt.$router.replace({'path' : '/'})
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
  background-color: black;
}
.cover-bg{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.4;
  filter: blur(5px);
}
.cover-img {
  width: 100%;
  height: 100%;
}
</style>
