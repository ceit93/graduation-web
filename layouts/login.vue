<template>
  <v-app>
    <v-content class="login-content">
    <div class="cover-bg">
      <img class="cover-img" src="@/static/cover.png" alt="">
    </div>
    <nuxt/>
    </v-content>
  </v-app>

</template>

<script>
  export default {

    name: "login"
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
  }
</style>
