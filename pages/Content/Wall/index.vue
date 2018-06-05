<template>
  <div></div>
</template>

<script>
    export default {
      name: "index",
      layout: 'content',
      fetch ({ store, redirect }) {
        return redirect('/content/wall/' + store.$auth.user.username)
      },
      middleware: 'redirect-to-landing' // TODO remove this
    }
</script>

<style scoped>

</style>
