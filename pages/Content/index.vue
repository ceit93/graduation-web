<template>
  <div></div>
</template>

<script>
  export default {
    name: "content",
    layout: 'content',
    fetch ({ store, redirect }) {
      return redirect('/content/wall')
    },
  }
</script>

<style scoped>

</style>

