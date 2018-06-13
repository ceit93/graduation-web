<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="(item, index) in studentsArray" :key="index">
        <div class="text-xs-center">
          <nuxt-link :to="'/' + item.username">
            <v-avatar size="120px">
              <img
                class="elevation-7 mb-1"
                :src="$helper.avatar(item)">
            </v-avatar>
            <h3 class="iranblack light-blue--text text--darken-3" style="text-decoration: none !important;">{{$persianJS.arabicChar(item.name)}}</h3>
            <p class="text-xs-center grey--text pt-1 pb-3" style="text-decoration: none;">{{$persianJS.englishNumber(item.std_numbers)}}</p>
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
    // fetch ({ store, redirect }) {
    //   if (store.$auth.loggedIn) {
    //     return redirect('/profile')
    //   }
    //   else
    //     return redirect('/login')
    // },
  }
</script>

