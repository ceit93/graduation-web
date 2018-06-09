<template>
  <tarin-form
    action="/interviews/create"
    title="کوتاه‌سوال خود را پیشنهاد دهید"
    label="یه سوال که جواب کوتاه بخواد..."
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
