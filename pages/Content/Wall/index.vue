<template>
  <div></div>
</template>

<script>
    export default {
      name: "index",
      layout: 'content',
      // fetch ({ store, redirect }) {
      //   return redirect('/content/wall/' + store.$auth.user.username)
      // },
      //TODO: remove this
      fetch ({ store, redirect }) {
        return redirect('/landing')
      },
    }
</script>

<style scoped>

</style>
