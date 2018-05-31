<template>
    <v-app>
      <top-header></top-header>
      <v-container fluid full-height>
        <v-content>
          <nuxt/>
        </v-content>
      </v-container>
      <bottom-footer></bottom-footer>
    </v-app>
</template>

<script>
  import persianJs from 'persianjs';
  import TopHeader from "~/components/TopHeader";
  import BottomFooter from "../components/BottomFooter";
  export default {
    components: {BottomFooter, TopHeader},
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
      },
      async logout() {
        await this.$auth.logout()
        this.$nuxt.$router.replace({'path' : '/login'})
      }
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
