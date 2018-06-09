<template>
  <div class="mx-auto d-flex align-items-center" style="height: 100%">
    <div>
      <h1 class="blue--text text--lighten-4 text-xs-center">ممنون از حضورتون :)</h1>
      <p class="blue--text text--lighten-4 text-xs-center">لطفا بازم بیاید و ما رو در برگزاری جشنمون یاری کنید.</p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "logout",
      fetch ({ store, redirect }) {
        if (store.$auth.loggedIn) {
          store.$auth.logout().then(e => {

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
