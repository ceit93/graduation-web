<template>
  <v-speed-dial
    v-model="fab"
    :absolute="false"
    :fixed="true"
    bottom
    left
    :open-on-hover="true"
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <v-btn
      slot="activator"
      v-model="fab"
      class="elevation-2"
      color="info"
      dark
      fab
    >
      <v-avatar size="56px"><img :src="this.$helper.avatar(this.$auth.user)"></v-avatar>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      v-for="action in this.actions"
      :key="action.name"
      fab
      dark
      small
      :color="action.color"
      nuxt
      :to="action.to"
      @click="doMethod(action)"
    >
      <v-icon>{{action.icon}}</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
    export default {
      name: "SpeedDial",
      data(){
        return {
          fab: false,
          actions: [
            {name: 'wall', icon:'list', to: '/content/wall/', color: 'black', dark: true},
            {name: 'newPost', icon:'add_comment', to: '/content/wall/new/', color: 'indigo', dark: true},
            {name: 'tarins', icon:'star', to: '/content/tarins/', color: 'orange', dark: true},
            {name: 'newTarin', icon:'bookmark', to: '/content/tarins/new/', color: 'green', dark: true},
            {name: 'up', icon:'keyboard_arrow_up', to: '', color: 'error', dark: true},

          ]
        }
      },
      methods: {
        doMethod(action){
          switch (action.name) {
            case 'up':
              this.$vuetify.goTo('#tabs', {
                duration: 300,
                offset: -100,
                easing: 'easeInOutCubic'
              })
              break;

            default:
              break;
          }
        },
      }
    }
</script>

<style scoped>

</style>
