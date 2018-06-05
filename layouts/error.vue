<template>
  <div class="mx-auto">
    <h1 class="grey--text text-xs-center">ای بابا :(</h1>
    <p class="grey--text text-xs-center">خطای {{this.errorCode}}: {{this.error.message}}</p>
  </div>
</template>

<script>
    export default {
      name: "error",
      props: ['error'],
      computed: {
        errorCode() {
          return this.$persianJS.englishNumber('' + this.error.statusCode)
        }
      },
      mounted () {
        console.log(this.error)
        // this.$nuxt.$router.replace({'path' : '/'})
      },
    }
</script>

<style scoped>
  html {
    direction: rtl;
    text-align: right !important;
    font-family:Iran !important;
  }
</style>
