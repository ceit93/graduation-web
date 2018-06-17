<template>
  <v-content class="login-content">
  <v-container fluid class="d-flex">
    <v-layout class="align-self-center">
      <v-flex md4 xs12 class="mx-auto">
        <v-card>
          <v-card-title class="blue darken-1 white--text justify-content-center">
            <span class="title">ورود به حساب</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit="submit" v-model="valid" lazy-validation>
              <v-text-field v-model="username"
                            label="شماره دانشجویی"
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
                >
                  وارد شوید
                </v-btn>
              </div>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </v-content>
</template>

<script>
  export default {
    layout: 'landing',
    name: 'CustomLogin',
    middleware: [],
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
        title: 'نام کاربری یا رمز عبور اشتباه است.',
        type: 'error'
      }
    },
    methods: {
      async submit(e) {
        e.preventDefault()
        if (this.$refs.form.validate()) {
          try {
            let result = await this.$auth.loginWith('local', {
              data: {
                username: this.username,
                password: this.password,
              }
            });
            // TODO : fix authentication
          } catch (e) {
            this.showLoginError()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
