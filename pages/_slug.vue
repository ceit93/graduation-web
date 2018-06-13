<template>
  <v-content>
    <v-container>
      <v-layout row wrap align-start>
        <v-flex xs12 md3>
          <div class="text-xs-center">
            <v-avatar size="130px">
              <img
                class="elevation-7 mb-1"
                :src="this.$helper.avatar(user)">
            </v-avatar>
            <div class="headline iranblack light-blue--text text--darken-3">{{this.$persianJS.arabicChar(user.name)}}</div>
            <div class="subheading text-xs-center grey--text pt-1 pb-3">{{this.$persianJS.englishNumber(user.std_numbers)}}</div>
            <v-layout justify-space-between>
              <a href="javascript:;" class="body-2">Home</a>
              <a href="javascript:;" class="body-2">About</a>
              <a href="javascript:;" class="body-2">Github</a>
              <a href="javascript:;" class="body-2">Other</a>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 md5 offset-md2>
          <div v-for="post in user.posts" :key="post._id">
            <v-card class="my-3" flat>
              <v-card-media
                v-if="post.image || post.image !== ''"
                class="white--text"
                height="170px"
                :src="post.image"
              >
                <v-container fill-height fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{ post.title }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-text>
                {{ post.body }}
              </v-card-text>
              <v-card-actions>
                <v-btn icon class="red--text">
                  <v-icon medium>fa-reddit</v-icon>
                </v-btn>
                <v-btn icon class="light-blue--text">
                  <v-icon medium>fa-twitter</v-icon>
                </v-btn>
                <v-btn icon class="blue--text text--darken-4">
                  <v-icon medium>fa-facebook</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="blue--text">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    export default {
      name: "ProfileSlug",
      middleware: 'admin',
      asyncData(context) {
        return context.$axios.get(`/users/${context.params.slug}`)
          .then((res) => {
            return {user: res.data.user}
          }).catch(e => {
            context.error({ statusCode: 404, message: 'کاربر مورد نظر یافت می‌نشود...' })
          })
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

<style scoped>

</style>
