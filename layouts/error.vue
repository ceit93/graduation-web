<template>
  <div>خطا</div>
</template>

<script>
    export default {
      name: "error",
      //TODO: remove this
      mounted () {
        this.$nuxt.$router.replace({'path' : '/'})
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
