<template>
  <div class="grey lighten-5">
    <identity></identity>
    <countdown date="June 23, 2018" :button="button"></countdown>
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
      }
    },
    components: {Identity, Countdown},
  }
</script>

<style scoped>
</style>
