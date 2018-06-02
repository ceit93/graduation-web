<template>
  <div></div>
</template>

<script>
  export default {
    name: "content",
    layout: 'content',
    fetch ({ store, redirect }) {
      return redirect('/content/wall/' + store.$auth.user.username)
    },
  }
</script>

<style scoped>

</style>

