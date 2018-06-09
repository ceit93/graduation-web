<template>
  <v-card-text justify-center>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 md4>
        <v-form ref="form" v-model="valid" lazy-validation @submit="submit">
          <v-card flat justify-center>
            <v-card-title class="justify-content-center">
              {{title}}
              <b><span class="red--text"> که در لیست نیست،</span></b>
                پیشنهاد کنید:
            </v-card-title>
            <v-card-text>
                <v-text-field
                  v-model="subject"
                  :rules="subjectRules"
                  :label="label"
                  :append-icon="icon"
                  required
                ></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-center">
              <v-btn
                :disabled="!valid"
                type="submit"
                class="success"
              >
                <v-icon small>add</v-icon>
                افزودن پیشنهاد
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
    </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    name: 'TarinForm',
    props: ['action', 'title', 'label', 'icon'],
    data() {
      return {
        valid: true,
        subject: '',
        subjectRules: [
          v => !!v || 'آیتم پیشنهادی خود را وارد کنید.',
        ],
      }
    },
    notifications: {
      showError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      },
      showSuccess: {
        title: 'پیشنهاد شما با موفقیت ثبت شد',
        type: 'success'
      }
    },
    methods: {
      submit (e) {
        e.preventDefault()
        if (this.$refs.form.validate()) {
          this.$axios.post(this.action, {
            subject: this.subject
          }).then(e => {
            this.showSuccess()
            this.$refs.form.reset()
          }).catch(e => {
            this.showError()
            console.log(e)
          })
        }
      },
    }
  }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
