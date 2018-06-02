<template>
  <v-app>
    <nuxt/>
  </v-app>

</template>

<script>
  export default {
    name: "landing"
  }
</script>

<style>
  .login-content {
    background-color: black;
  }
  .cover-bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.4;
    filter: blur(5px);
  }
  .cover-img {
    width: 100%;
    height: 100%;
  }
</style>
