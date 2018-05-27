<template>

  <v-container fluid class="d-flex">
    <v-layout class="align-self-center">
      <v-flex md4 xs12 class="mx-auto">
        <v-card>
          <v-card-title class="blue darken-1 white--text justify-content-center">
            <span class="title">ورود به حساب</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="stdNumber"
                            label="شماره دانشجویی"
                            light
                            :rules="userRules"
                            required
                            @keyup.enter="submit"
              >
              </v-text-field>

              <v-text-field v-model="password"
                            label="رمز عبور"
                            class="pt-3"
                            light
                            :rules="passRules"
                            required
                            type="password"
                            @keyup.enter="submit"
              >
              </v-text-field>
              <div class="d-flex justify-content-center">
                <v-btn
                  class="success"
                  @click="submit"
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


</template>

<script>
  export default {
    layout: 'login',
    data() {
      return {
        stdNumber: '',
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
      showLoginError: { // You can have any name you want instead of 'showLoginError'
        title: 'Login Failed',
        type: 'error' // You also can use 'VueNotifications.types.error' instead of 'error'
      }
    },
    methods: {
      async submit() {

        if (this.$refs.form.validate()) {
          try {
            this.$auth.loginWith('local', {data: {
              username: this.stdNumber,
              password: this.password,
            }});

            this.$router.push('/userPage')

          } catch (e) {

            this.showLoginError({title: 'شماره دانشجویی یا رمز عبور اشتباه است.'});
          }
        }
      }
    },
    created() {
      console.log(this.$root);
      // this.$axios.setHeader('Access-Control-Allow-Origin','*');
    }
  }
</script>

<style scoped>

</style>
