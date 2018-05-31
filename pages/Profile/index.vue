<template>
  <div class="bg-main">
    <identity></identity>
    <countdown date="June 21, 2018"></countdown>
  </div>
</template>

<script>
  import Countdown from '~/components/Profile/Countdown.vue'
  import Identity from "../../components/Profile/Identity";
  export default {
    name: "index",
    data() {
      return {
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
    components: {Identity, Countdown }
  }
</script>

<style scoped>
</style>
