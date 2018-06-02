<template>
  <div></div>
</template>

<script>
  export default {
    name: "content",
    layout: 'content',
    fetch ({ store, redirect }) {
      return redirect('/content/posts')
    },
  }
</script>

<style scoped>

</style>

