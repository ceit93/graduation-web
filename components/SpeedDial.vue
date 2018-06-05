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
      v-for="action in this.navs"
      :key="action.name"
      fab
      dark
      small
      :color="action.color"
      nuxt
      :to="action.to"
      @click="doAction(action)"
    >
      <v-icon>{{action.icon}}</v-icon>
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
      @click="doAction(action)"
    >
      <v-icon>{{action.icon}}</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
    export default {
      name: "SpeedDial",
      props: ['actions'],
      data(){
        return {
          fab: false,
          navs: [
            {name: 'up', icon:'keyboard_arrow_up', color: 'info', dark: true},
            {name: 'back', icon:'keyboard_arrow_left', color: 'light-blue darken-4', dark: true},
          ]
        }
      },
      methods: {
        doAction(action){
          this.$emit(action.name)
        }
      }
    }
</script>

<style scoped>

</style>
