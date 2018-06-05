<template>
  <div class="mx-auto d-flex align-items-center" style="height: 100%">
    <div>
      <h1 class="grey--text text-xs-center">ای بابا 😞</h1>
      <p class="grey--text text-xs-center">خطای {{this.errorCode}}: {{this.error.message}}</p>
      <div class="d-flex justify-content-center">
        <v-btn nuxt to="/" color="info" outline style="flex: none!important;">
          <v-icon small>loop&nbsp;</v-icon>
          بازگشت به صفحه اصلی
        </v-btn>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "error",
    props: ['error'],
    layput: 'default',
    computed: {
      errorCode() {
        return this.$persianJS.englishNumber('' + this.error.statusCode)
      }
    },
    mounted() {
      console.log(this.error)
      // this.$nuxt.$router.replace({'path' : '/'})
    },
  }
</script>

<style scoped>
  html {
    direction: rtl;
    text-align: right !important;
    font-family: Iran !important;
  }
</style>
