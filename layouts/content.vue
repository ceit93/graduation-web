<template>
  <v-app>
    <top-header></top-header>
    <v-container fluid full-height>
      <v-content>
        <div class="bg-main">
          <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100 g-content-bg-image">
          <!--style="margin-top: -10px;"-->
          <v-tabs
            dark
            icons-and-text
            centered
            grow
            fixed-tabs
            show-arrows
            id="tabs"
            slider-color="yellow"
            color="light-blue darken-2"
            class="ltr"
          >
            <v-tab v-for="(item,index) in tabs" :to="item.to" :key="index">
              {{item.name}}
              <v-icon>{{item.icon}}</v-icon>
            </v-tab>
          </v-tabs>
          <v-card flat>
            <nuxt/>
            <speed-dial :actions="actions" @up="goUp" @back="goBack" @logout="logout"></speed-dial>
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
            name: 'افزودن ترین دلخواه',
            icon: 'bookmark',
            to: '/content/tarins/new'
          },
          {
            name: 'ترین‌ها',
            icon: 'star',
            to: '/content/tarins'
          },
          {
            name: 'کوتاه‌پاسخ‌ها',
            icon: 'format_quote',
            to: '/content/interview'
          },
          {
            name: 'دل‌نوشته جدید',
            icon: 'add_comment',
            to: '/content/wall/new'
          },
          {
            name: 'دیوار دل‌نوشته‌ها',
            icon: 'mdi-account-card-details',
            to: '/content/wall'
          },
        ],
        actions: [
          {name: 'profile', icon:'home', to: '/profile', color: 'success', dark: true},
          {name: 'wall', icon:'mdi-account-card-details', to: '/content/wall/', color: 'purple', dark: true},
          // {name: 'newPost', icon:'add_comment', to: '/content/wall/new/', color: 'indigo', dark: true},
          {name: 'tarins', icon:'star', to: '/content/tarins/', color: 'orange', dark: true},
          // {name: 'newTarin', icon:'bookmark', to: '/content/tarins/new/', color: 'green', dark: true},
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
    font-family: Iran !important;
  }
  .ltr{
    direction: ltr;
  }
</style>
