<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "index",
    fetch ({ store, redirect }) {
      console.log(store)
      if (store.$auth.loggedIn) {
        return redirect('/profile')
      }
      else
        return redirect('/login')
    },
  }
</script>

