<template>
  <div></div>
</template>

<script>
    export default {
      name: "index",
      layout: 'content',
      mounted() {
        console.log(this.$auth.user.username)
        this.$nuxt.$router.replace({'path' : '/content/wall/' + this.$auth.user.username})
      }
    }
</script>

<style scoped>

</style>
