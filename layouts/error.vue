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

</style>
