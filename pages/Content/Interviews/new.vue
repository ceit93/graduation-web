<template>
  <suggestion-form
    title="یک سوال"
    label="یه سوال که جواب کوتاه بخواد..."
    icon="format_quote"
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
        title: 'سوال یپیشنهادی شما با موفقیت ثبت شد.',
        type: 'success'
      }
    },
    methods: {
      submit(value) {
        this.$axios.post('/questions', {
          question: value
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
