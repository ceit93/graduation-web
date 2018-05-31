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
    components: {Identity, Countdown }
  }
</script>

<style scoped>
</style>
