<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card flat class="justify-content-center justify-center" height="100%">
          <v-card-text class="text-xs-center">
            <div class="text-xs-center">
              <v-pagination
                :length="pagesCount"
                next-icon="chevron_left"
                prev-icon="chevron_right"
                color="info"
                v-model="page"
                circle class="ceit-ltr">
              </v-pagination>
              <p class="grey--text">صفحه {{this.$persianJS.englishNumber(page)}} از {{this.$persianJS.englishNumber(pagesCount)}}</p>
            </div>
            <v-container>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 v-for="interview in this.interviewsChunk()" :key="interview._id" align-center justify-center class="text-xs-center">
                  <v-layout row wrap justify-center class="text-xs-center mx-0">
                    <v-flex xs12 md4>
                      <v-subheader class="blue--text">{{interview.question.text}}</v-subheader>
                    </v-flex>
                    <v-flex xs12 md6 class="mx-2">
                      <v-text-field
                        v-model="interview.answer"
                        placeholder="یه جواب کوتاه..."
                        :label="interview.question.text"
                        prepend-icon="format_quote"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <p class="grey--text">صفحه {{this.$persianJS.englishNumber(page)}} از {{this.$persianJS.englishNumber(pagesCount)}}</p>
            <div class="text-xs-center">
              <v-pagination
                :length="pagesCount"
                next-icon="chevron_left"
                prev-icon="chevron_right"
                color="info"
                v-model="page"
                circle class="ceit-ltr">
              </v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "Interviews",
      props: ['interviews', 'perPage'],
      data() {
        return {
          dialog: false,
          page: 1,
        }
      },
      computed: {
        pagesCount() {
          return Math.ceil(this.interviews.length / this.perPage)
        }
      },
      methods: {
        interviewsChunk(){
          let start = this.perPage * (this.page - 1)
          console.log(this.interviews.slice(start, start + this.perPage))
          return this.interviews.slice(start, start + this.perPage)
        }
      },
    }
</script>

<style scoped>

</style>
