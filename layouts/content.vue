<template>
  <v-app>
    <top-header></top-header>
    <v-container fluid full-height>
      <v-content>
        <div class="bg-main">
          <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100">
          <v-tabs icons-and-text dark id="tabs" color="light-blue darken-2" style="margin-top: -10px;">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="(item,index) in tabs" :to="item.to" :key="index">
              {{item.name}}
              <v-icon>{{item.icon}}</v-icon>
            </v-tab>
          </v-tabs>
          <v-card flat>
            <nuxt/>
            <speed-dial></speed-dial>
          </v-card>
        </div>
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
        tabs: [
          {
            name: 'دیوار دل‌نوشته‌ها',
            icon: 'list',
            to: '/content/wall'
          },
          {
            name: 'دل‌نوشته جدید',
            icon: 'add_comment',
            to: '/content/wall/new'
          },
          {
            name: 'ترین‌ها',
            icon: 'star',
            to: '/content/tarins'
          },
          {
            name: 'افزودن ترین دلخواه',
            icon: 'bookmark',
            to: '/content/tarins/new'
          },
        ],
      }
    },
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
      },
      async logout() {
        await this.$auth.logout()
        this.$nuxt.$router.replace({'path' : '/login'})
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
