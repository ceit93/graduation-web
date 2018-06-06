<template>
    <v-app>
      <top-header></top-header>
      <v-container fluid full-height>
        <v-content style="height: 100%">
          <nuxt/>
          <speed-dial :actions="actions"></speed-dial>
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
          // {name: 'register', icon:'mdi-account-plus', to: '/register', color: 'indigo', dark: true}, // TODO: uncomment this line
        ]
      }
    },
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
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
