<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "index",
    fetch ({ store, redirect }) {
      if (store.$auth.loggedIn) {
        return redirect('/landing')
      }
      else
        return redirect('/login')
    },
  }
</script>

