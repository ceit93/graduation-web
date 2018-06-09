<template>
  <tarin-form
    action="/qualification/create"
    title="ترین جدید خود را پیشنهاد دهید"
    label="چی‌چی‌ترین؟"
    icon="bookmark"
  ></tarin-form>
</template>

<script>
    import TarinForm from "~/components/Content/Tarins/TarinForm"
    export default {
      name: "new",
      components: {TarinForm},
      layout: 'content',
    }
</script>

<style scoped>

</style>
