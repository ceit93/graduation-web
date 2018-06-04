<template>
  <v-card>
    <v-card-text>
      <v-layout align-center justify-center row>
        <v-flex>
          <v-card flat justify-center>
            <v-card-title class="justify-content-center">
              <h3>ترین‌های خود را انتخاب کنید</h3>
            </v-card-title>
            <v-form ref="tarins" @submit="submit">
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                type="submit"
                class="success"
              >
                <v-icon>how_to_vote</v-icon>
                ذخیره
              </v-btn>
            </v-card-actions>
            <v-card-text>
                <v-container fluid>
                  <v-layout row wrap class="text-xs-center mx-0">
                    <v-flex xs12 md6 v-for="tarin in votes" :key="tarin._id" align-center justify-center class="text-xs-center">
                      <v-layout row wrap class="text-xs-center mx-0">
                        <v-flex xs3 class="text-xs-center">
                          <v-subheader>{{tarin.qualification.title}}</v-subheader>
                        </v-flex>
                        <v-flex xs5>
                          <v-select
                            :items="people"
                            item-text="name"
                            item-value="objectID"
                            :label="tarin.qualification.title"
                            class="input-group--focused"
                            v-model="tarin.candidate"
                            autocomplete
                            deletable-chips
                            chips
                            dense
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                type="submit"
                class="success"
              >
                <v-icon>how_to_vote</v-icon>
                ذخیره
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
      name: 'Tarins',
      props: ['people', 'votes'],
      data() {
        return {
          valid: true,
        }
      },
      mounted() {
        this.fetchPeople()
        this.fetchTarins()
      },
      notifications: {
        showSuccess: {
          title: 'رای شما ذخیره شد.',
          type: 'success'
        },
        showError: {
          title: 'خطایی رخ داد...',
          type: 'error'
        }
      },
      methods: {
        submit (e) {
          e.preventDefault()
          this.$axios.post('/poll/submit', {
            votes: this.votes
          }).then(e => {
            this.showSuccess()
          }).catch(e => {
            this.showError()
          })
        },

        async fetchTarins() {
          // Get current user's votes
          this.$axios.get('polls').then(e => {
            //TODO
            console.log('got it!')
            console.log(e)
          })

          // Get the titles
//          this.$axios.get('qualifications').then(e => {
//            this.votes = e.data.quals
//            console.log(this.tarins)
//          }).catch(e => {
//            console.log(e)
//            this.showError()
//          })
        },

        async fetchPeople() {
          this.$axios.get('/users/students').then(e => {
            this.people = e.data
          }).catch(e => {
            console.log(e)
            this.showError()
          })
        }

      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
