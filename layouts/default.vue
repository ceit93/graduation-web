<template>
    <v-app>
      <top-header></top-header>
      <v-container fluid full-height>
        <v-content style="height: 100%">
          <nuxt/>
          <!--<speed-dial :actions="actions" @up="goUp" @back="goBack" @logout="logout"></speed-dial>-->
        </v-content>
      </v-container>
      <bottom-footer></bottom-footer>
    </v-app>
</template>

<script>
  import persianJs from 'persianjs';
  import TopHeader from "~/components/TopHeader";
  import BottomFooter from "../components/BottomFooter";
  import SpeedDial from "../components/SpeedDial";
  export default {
    components: {SpeedDial, BottomFooter, TopHeader},
    data() {
      return {
        actions: [
          {name: 'profile', icon:'home', to: '/profile', color: 'success', dark: true},
          {name: 'wall', icon:'mdi-account-card-details', to: '/content/wall/', color: 'purple', dark: true},
          // {name: 'register', icon:'mdi-account-plus', to: '/register', color: 'indigo', dark: true}, // TODO: uncomment this line
        ]
      }
    },
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
      },
      goUp(){
        this.$vuetify.goTo('#toolbar', {
          duration: 300,
          offset: -10,
          easing: 'easeInOutCubic'
        })
      },
      goBack(){
        this.$nuxt.$router.go(-1)
      },
      async logout() {
        await this.$auth.logout()
        this.$nuxt.$router.replace({'path': '/login'})
      },
    },
  }
</script>

<style>
  html {
    direction: rtl;
    text-align: right !important;
    font-family:Iran !important;
  }
</style>
