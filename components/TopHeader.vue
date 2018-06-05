<template>
  <div>
    <v-navigation-drawer
      class="hidden-md-and-up light-blue darken-4"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      dark
      :right="true"
    >

      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
          class="ceit-tile"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" class="light-blue darken-4" dark id="toolbar">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-btn :to="'/'" nuxt icon class="user-button">
        <v-avatar
          :tile="true"
          :size="50"
        >
          <img src="/logo.png" alt="بهترین وب‌اپلیکیشن فارغ‌التحصیلی">
        </v-avatar>
      </v-btn>
      <v-toolbar-title v-text="title" class="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items" :to="item.to" exact :key="item.title">{{item.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'TopHeader',
    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        miniVariant: false,
        items: [
          { icon: 'mdi-message-text', title: 'محتوا', to: '/content'},
          // { icon: 'mdi-account-plus', title: 'ثبت‌نام جشن', to: '/register'}, TODO uncomment this line
          { icon: 'mdi-exit-to-app', title: 'خروج', to: '/logout'},
        ],
        title: 'فارغ‌التحصیلی ۹۳',
      }
    },
  }
</script>

<style scoped>
  .title {
    overflow: visible;
  }
  .user-avatar {
    width: 45px;
  }
  .user-button {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
