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
            <div class="iranblack text-xs-center pt-2">{{this.$persianJS.englishNumber(user.std_numbers)}}</div>
            <div class="iranblack text-xs-center pb-3"><a :href="`mailto:${user.email}`" target="_blank">{{user.email}}</a> </div>
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
              v-if="post.approved"
              :postData="post"
              :belongsToLoggedInUser="false"
              :showControls="false">
            </post>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    import Post from "../components/Content/Posts/Post";
    import users from "~/static/data/users.json";
    import questions from "~/static/data/questions.json";
    import interviews from "~/static/data/interviews.json";
    export default {
      name: "ProfileSlug",
      auth: false,
      components: {
        Post},
      async asyncData(context) {
        let temp = questions.map(x => {return {question: x, answer: ''}})
        let username = context.params.slug
        let user = users.find(u => u.username === username)
        for (let i in user.interviews){
          let id = user.interviews[i]
          let interv = interviews.find(u => u._id === id)
          interv.question = questions.find(q => q._id === interv.question)
          user.interviews[i] = interv
        }
        console.log(user.interviews)
        return {user: user}
      },
      data(){
        return{
        }
      },
    }
</script>

<style scoped>

</style>
