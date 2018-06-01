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
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          @click="logout"
          class="yellow--text text--accent-2"
        >
          <v-list-tile-action>
            <v-icon>mdi-power</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>خروج</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" class="light-blue darken-4" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-btn :to="'/'" nuxt icon class="user-button">
        <v-avatar
          :tile="true"
          :size="50"
          @click="this.drawer = false"
        >
          <!--TODO: IMPLEMENT USER AVATAR-->
          <img src="logo.png" :alt="this.$auth.user.name">
        </v-avatar>
      </v-btn>
      <v-toolbar-title v-text="title" class="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items" :to="item.to" exact :key="item.title">{{item.title}}</v-btn>
        <v-btn flat @click="this.logout" class="yellow--text text--accent-2">خروج</v-btn>
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
          { icon: 'mdi-account-plus', title: 'ثبت‌نام', to: '/register'},
        ],
        title: 'فارغ‌التحصیلی ۹۳',
      }
    },
    methods: {
      async logout() {
        await this.$auth.logout()
        this.$nuxt.$router.replace({'path' : '/login'})
      }
    }
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
