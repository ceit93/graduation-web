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
    export default {
      name: "ProfileSlug",
      auth: false,
      components: {Post},
      async asyncData(context) {
        let user = await context.$axios.get(`/users/${context.params.slug}`)
          .then((res) => {
            return res.data.user
          }).catch(e => {
            context.error({ statusCode: 404, message: 'کاربر مورد نظر یافت می‌نشود...' })
          })
        let questions = await context.$axios.get('/questions')
          .then((res) => {
            return res.data.questions
          }).catch(e => {
            context.error({statusCode: 500, message: 'خطای سرور...'})
          })
        let temp = questions.map(x => {
          return {question: x, answer: ''}
        })
        user.interviews = temp.map(x => Object.assign(x, user.interviews.find(interview => interview.question._id === x.question._id)))
        return {user: user}
      },
    }
</script>

<style scoped>

</style>
