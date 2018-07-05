<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap align-start justify-content-center>
        <v-flex xs11 md3>
          <div class="text-xs-center">
            <v-avatar tile size="95%">
              <img
                class="elevation-5 mb-1"
                :src="this.$helper.avatar(user)">
            </v-avatar>
            <h1 class="iranblack light-blue--text text--darken-3 mt-2">{{this.$persianJS.userName(user)}}</h1>
            <div class="iranblack text-xs-center pt-2 pb-3">{{this.$persianJS.englishNumber(user.std_numbers)}}</div>
            <!--<h3 class="iranblack text-xs-center pt-0 pb-2">بالاترین رأی‌ها:</h3>-->
            <div class="pb-5">
              <div class="light-blue--text" v-for="(tarin, index) in user.topTarins" :key="index"
                   v-bind:style="{fontSize: 25-2*index + 'px' }">
                #{{tarin.name}}
              </div>
            </div>
            <div v-for="interview in user.interviews" v-if="$helper.isValid(interview.answer)" :key="interview._id" class="text-xs-right mr-3">
              <span class="caption iranblack text-xs-center blue-grey--text">{{interview.question.text}}؟</span>&nbsp;
              <span class="caption blue-grey--text text--darken-4">{{interview.answer}}</span>
            </div>
          </div>
        </v-flex>
        <v-flex xs11 md8>
          <div v-for="post in user.posts" :key="post._id">
            <post
              :postData="post"
              :belongsToLoggedInUser="false">
            </post>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    import Post from "../components/Content/Posts/Post";
    export default {
      name: "ProfileSlug",
      components: {
        Post},
      middleware: 'admin',
      asyncData(context) {
        return context.$axios.get(`/users/${context.params.slug}`)
          .then((res) => {
            return {user:
            res.data.user}
          }).catch(e => {
            context.error({ statusCode: 404, message: 'کاربر مورد نظر یافت می‌نشود...' })
          })
      },

      data(){
        return{
        }
      },

//      computed: {
//        prettyPeople() {
//          let res = []
//          for (let tarin of this.tarins) {
////            person.name = this.$persianJS.userName(person)
////            person.avatar = this.$helper.avatar(person)
////            res.push(person)
//          }
//          res = []
////          res = this.$helper.sortBy(res, 'std_numbers')
//          return res
//        }
//      },

//      async asyncData (context) {
//        let tarins = await context.$axios.get('polls/mta9896')
//          .then(e => {
//            return e.data
//          }).catch(e => {
//            context.error({ statusCode: 500, message: e.toString() })
//          })
//        return {
//          tarins: tarins
//        }
//      },
    }
</script>

<style scoped>

</style>
