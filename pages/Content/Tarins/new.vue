<template>
  <suggestion-form
    title="یک ترین دل‌خواه"
    label="چی‌چی‌ترین؟"
    icon="bookmark"
    @submit="submit"
  ></suggestion-form>
</template>

<script>
import SuggestionForm from "~/components/Content/SuggestionForm.vue"
export default {
  name: "new",
  components: {SuggestionForm},
  layout: 'content',
  notifications: {
    showError: {
      title: 'خطایی رخ داد...',
      type: 'error'
    },
    showSuccess: {
      title: 'ترین پیشنهادی شما با موفقیت ثبت شد.',
      type: 'success'
    }
  },
  methods: {
    submit(value) {
      this.$axios.post('/qualification/create', {
        subject: value
      }).then(e => {
        this.showSuccess()
      }).catch(e => {
        this.showError()
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
