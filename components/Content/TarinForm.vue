<template>
  <v-card-text justify-center>
    <v-layout align-center justify-center row>
      <v-flex xs12 sm8 md4>
      <v-card flat justify-center>
        <v-card-title class="justify-content-center">
          یک ترین دلخواه که در لیست ترین‌ها نیست اضافه کنید:
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="subject"
              :rules="subjectRules"
              label="چی‌چی‌ترین؟"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            :disabled="!valid"
            @click="submit"
            class="success"
          >
            <v-icon>add</v-icon>
            اضافه کردن یک ترین
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    name: 'Tarins',
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
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // this.$axios.post('/api/poll/add', {
          //   subject: this.subject
          // })
          console.log(this.subject)
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
