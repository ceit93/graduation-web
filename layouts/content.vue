<template>
  <v-app>
    <top-header></top-header>
    <v-container fluid full-height>
      <v-content>
        <div class="bg-main">
          <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100 g-content-bg-image">
          <!--style="margin-top: -10px;"-->
          <v-tabs
            right
            style="direction: rtl;text-align: right;justify-content: right"
            icons-and-text
            dark
            id="tabs"
            color="light-blue darken-2"
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="(item,index) in tabs" :to="item.to" :key="index">
              {{item.name}}
              <v-icon>{{item.icon}}</v-icon>
            </v-tab>
          </v-tabs>
          <v-card flat>
            <nuxt/>
            <speed-dial :actions="this.actions" @up="this.goUp" @back="this.goBack"></speed-dial>
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
            icon: 'mdi-account-card-details',
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
        actions: [
          {name: 'wall', icon:'list', to: '/content/wall/', color: 'black', dark: true},
          {name: 'newPost', icon:'add_comment', to: '/content/wall/new/', color: 'indigo', dark: true},
          {name: 'tarins', icon:'star', to: '/content/tarins/', color: 'orange', dark: true},
          {name: 'newTarin', icon:'bookmark', to: '/content/tarins/new/', color: 'green', dark: true},
        ]
      }
    },
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
      },
      goUp(action) {
        this.$vuetify.goTo('#tabs', {
          duration: 300,
          offset: -100,
          easing: 'easeInOutCubic'
        })
      },
      goBack(action){
        console.log(action)
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

  /*mobile*/
  @media (max-width: 768px) {
    .tabs__item {
      font-size: 0.75rem;
    }
  }

  @media (min-width: 768px) {
    .tabs__item {
      font-size: 1rem;
    }
  }
</style>
