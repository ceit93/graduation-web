<template>
  <div class="grey lighten-5">
    <identity></identity>
    <countdown date="June 21, 2018" :button="button"></countdown>
  </div>
</template>

<script>
  import Countdown from '~/components/Profile/Countdown.vue'
  import Identity from "../components/Profile/Identity";
  export default {
    name: "index",
    data() {
      return {
        button: {
          hidden: false,
          title: 'تکمیل محتوا',
          outline: false,
          disabled: false,
          to: '/content'
        },
        notifs: []
      }
    },
    notifications: {
      showNotif: {
        title: 'یک پیام جدید...',
        message: 'محتوای پیام...',
        type: 'info'
      }
    },
    asyncData(context) {
      return context.$axios.get('/notifications')
        .then((res) => {
          return { notifs: res.data.notifications }
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
    },
    mounted() {
      this.notifs.forEach(notif => {
        this.showNotif(notif)
      })
    },
    components: {Identity, Countdown },
  }
</script>

<style scoped>
</style>
