<template>
  <div>{{this.error}}</div>
</template>

<script>
    export default {
      name: "error",
      props: ['error'],
      //TODO: remove this
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
