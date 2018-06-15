<template>
  <v-container>
    <v-layout row wrap align-center justify-center>
      <v-flex xs11 class="text-xs-center mt-5 mb-5">
        <h1 class="iranblack blue--text text--darken-3">جامعه دانش‌آموختگان ورودی سال ۱۳۹۳</h1>
        <h2 class="iranblack">دانشکده مهندسی کامپیوتر و فناوری اطلاعات</h2>
        <h3 class="iranblack">دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)</h3>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6 sm4 md3 lg2 v-for="(item, index) in studentsArray" :key="index">
        <div class="text-xs-center no-underline">
          <nuxt-link :to="'/' + item.username">
            <v-avatar size="80%">
              <img
                class="elevation-7 mb-1"
                width="100%"
                :src="$helper.avatar(item)">
            </v-avatar>
            <h3 class="iranblack light-blue--text text--darken-3">{{$persianJS.arabicChar(item.name)}}</h3>
            <p class="iranblack caption text-xs-center grey--text pt-1 pb-3">{{$persianJS.englishNumber(item.std_numbers)}}</p>
          </nuxt-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        students: [],
      }
    },
    computed: {
      studentsArray : function() {
        let res = []
        for (let person of this.people){
          person.name = this.$persianJS.userName(person)
          person.avatar = this.$helper.avatar(person)
          res.push(person)
        }
        res = this.$helper.sortBy(res, 'std_numbers')
        return res
      },
    },

    async asyncData (context) {
      let {people} = await context.$axios.get('/users/students')
        .then((res) => {
          return { people: res.data }
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
      return {
        people: people
      }
    },
  }
</script>

<style>
  .no-underline > a{
    text-decoration: none;
  }
</style>
