<template>
<v-content>
    <v-container>
      <div class="d-flex justify-content-center mt-3">
            <v-flex xs6 sm5 md3 style="flex: none !important;">
              <img src="/icon.png" width="100%"/>
            </v-flex>
      </div>
      <div class="mx-auto d-flex align-items-center" style="height: 100%">
        <div>
          <h1 class="grey--text text-xs-center">ای بابا 😞</h1>
          <p class="grey--text text-xs-center">خطای {{this.errorCode}}: {{this.error.message}}</p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
          <v-btn nuxt to="/" color="black" dark outline style="flex: none!important;">
            <v-icon small>home&nbsp;</v-icon>
            صفحه اصلی
          </v-btn>
      </div>
      <div class="d-flex justify-content-center">
        <v-btn @click="goBack" color="black" outline style="flex: none!important;">
          <v-icon small>chevron_right&nbsp;</v-icon>
          بازگشت
        </v-btn>
      </div>
    </v-container>
</v-content>
</template>

<script>
  export default {
    name: "error",
    props: ['error'],
    layout: 'landing',
    computed: {
      errorCode() {
        return this.$persianJS.englishNumber('' + this.error.statusCode)
      }
    },
    mounted() {
      console.log(this.error)
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
