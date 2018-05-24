<template>

  <v-container fluid class="d-flex">
    <v-layout class="align-self-center">
      <v-flex md4 xs12 offset-md4>
        <v-card>
          <v-card-title class="blue darken-1 white--text justify-content-center">
            <span class="title">ورود به حساب</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="stdNumber"
                            label="شماره دانشجویی"
                            light
              >

              </v-text-field>

              <v-text-field v-model="password"
                            label="رمز عبور"
                            class="pt-3"
                            light>
              </v-text-field>
              <div class="d-flex justify-content-center">
                <v-btn
                  class="success"
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
    name: "index.vue",
    data() {
      return {
        stdNumber: '',
        password: ''
      }
    }
  }
</script>

<style scoped>

</style>
