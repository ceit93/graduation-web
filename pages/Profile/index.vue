<template>
  <div class="grey lighten-5">
    <identity></identity>
    <countdown date="June 21, 2018" :button="button"></countdown>
  </div>
</template>

<script>
  import Countdown from '~/components/Profile/Countdown.vue'
  import Identity from "../../components/Profile/Identity";
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
        notifs: [
          {title: 'خوش اومدین', message: 'لطفا تا قبل ۳۱ خرداد محتوا رو تکمیل کنید.', type: 'warn', timeout: 10000},
        ]
      }
    },
    notifications: {
      showNotif: {
        title: 'یک پیام جدید...',
        message: 'محتوای پیام...',
        type: 'info'
      }
    },
    mounted() {
      this.fetchNotifs()
      this.notifs.forEach(notif => {
        this.showNotif(notif)
      })
    },
    methods: {
      async fetchNotifs() {
        // this.notifs = this.$axios.get('/notifications')
        console.log(this.notifs)
      }
    },
    components: {Identity, Countdown },
    middleware: 'redirect-to-landing' // TODO remove this
  }
</script>

<style scoped>
</style>
