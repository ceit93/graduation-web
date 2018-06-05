<template>
  <v-speed-dial
    v-model="fab"
    :absolute="fale"
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
      fab
      dark
      small
      color="green"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="indigo"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
    export default {
      name: "SpeedDial",
      data(){
        return {
          fab: false
        }
      }
    }
</script>

<style scoped>

</style>
