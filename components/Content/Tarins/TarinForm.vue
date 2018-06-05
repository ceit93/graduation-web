<template>
  <v-card-text justify-center>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 md4>
        <v-form ref="form" v-model="valid" lazy-validation @submit="submit">
          <v-card flat justify-center>
            <v-card-title class="justify-content-center">
              یک ترین دلخواه
              <b><span class="red--text"> که در لیست ترین‌ها نیست،</span></b>
                اضافه کنید:
            </v-card-title>
            <v-card-text>
                <v-text-field
                  v-model="subject"
                  :rules="subjectRules"
                  label="چی‌چی ترین؟"
                  append-icon="bookmark"
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
                اضافه کردن یک ترین
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
    data() {
      return {
        tarins: {},
        valid: true,
        subject: '',
        subjectRules: [
          v => !!v || 'ترین مورد نظر خود را وارد کنید',
        ],
      }
    },
    notifications: {
      showError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      },
      showSuccess: {
        title: 'ترین مورد نظر با موفقیت ثبت شد.',
        type: 'success'
      }
    },
    methods: {
      submit (e) {
        e.preventDefault()
        if (this.$refs.form.validate()) {
          this.$axios.post('/qualification/create', {
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
