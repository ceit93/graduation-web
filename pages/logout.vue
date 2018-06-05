<template>
  <div></div>
</template>

<script>
    export default {
      name: "logout",
      fetch ({ store, redirect }) {
        if (store.$auth.loggedIn) {
          this.$auth.logout().then(e => {

          }).catch(e => {

          }).finally(e => {
            return redirect('/login')
          })
        }
        else
          return redirect('/login')
      },
    }
</script>

<style scoped>

</style>
