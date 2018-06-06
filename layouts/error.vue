<template>
  <div class="mx-auto d-flex align-items-center" style="height: 100%">
    <div>
      <h1 class="grey--text text-xs-center">ای بابا 😞</h1>
      <p class="grey--text text-xs-center">خطای {{this.errorCode}}: {{this.error.message}}</p>
      <div class="d-flex justify-content-center">
        <v-btn nuxt to="/" color="info" outline style="flex: none!important;">
          <v-icon small>home&nbsp;</v-icon>
          صفحه اصلی
        </v-btn>
      </div>
      <div class="d-flex justify-content-center">
        <v-btn @click="goBack" color="info" outline style="flex: none!important;">
          <v-icon small>chevron_right&nbsp;</v-icon>
          بازگشت
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
      // this.$nuxt.$router.replace({'path' : '/'})
    },
    methods: {
      goBack(){
        this.$nuxt.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  html {
    direction: rtl;
    text-align: right !important;
    font-family: Iran !important;
  }
</style>
