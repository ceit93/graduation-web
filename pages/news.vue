<template>
  <v-content>
    <v-container>
      <v-layout row wrap align-center justify-center class="mb-3">
        <v-flex xs11 class="text-xs-center">
          <h1 class="iranblack red--text text--darken-3">اخبار و اطلاعیه‌های مهم</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-center>
        <v-flex xs10 v-for="(item, index) in notifs" :key="index">
          <h2 class="iranblack">{{item.title}}</h2>
          <p>{{item.message}}</p>
          <v-divider></v-divider>
          <br>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "news",
    asyncData(context) {
      return context.$axios.get('/notifications')
        .then((res) => {
          return { notifs: res.data.notifications.reverse() }
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
    },
  }
</script>

<style scoped>

</style>
