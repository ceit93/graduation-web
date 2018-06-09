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
                outline
                type="submit"
                color="light-blue"
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
    name: 'SuggestionForm',
    props: ['title', 'label', 'icon'],
    data() {
      return {
        valid: true,
        subject: '',
        subjectRules: [
          v => !!v || 'آیتم پیشنهادی خود را وارد کنید.',
        ],
      }
    },
    methods: {
      submit (e) {
        e.preventDefault()
        this.$emit('submit', this.subject)
      },
    }
  }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
