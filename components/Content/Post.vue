<template>
  <div class="mb-3">
    <v-card class="elevation-5">
      <v-card-text>
        <div class="d-md-flex justify-content-between">
          <!--user name-->
          <div class="align-items-end d-md-flex ">
            <nuxt-link to="">
              <v-avatar size="40px" class="elevation-2">
                <!--TODO: Implement the avatar-->
                <img src="avatar.png" alt="">
              </v-avatar>
            </nuxt-link>
            <span class="mr-2 body-2">{{data.title}} - برای {{data.to}}</span>
          </div>
          <!--post date-->
          <div class="g-text-dates">
            {{data.date | moment('HH:MM jYYYY/jMM/jD') | makeParsi}}
          </div>
        </div>
        <v-divider class="mt-2 mb-2"/>
        <div style="text-align:justify;">
          {{data.body}}
        </div>
      </v-card-text>


      <!--TODO make the following element conditional-->
      <v-card-actions>
        <v-card-actions class="justify-content-center">
          <v-btn
            @click="deletePost"
            color="error"
          >
            <v-icon>delete</v-icon>
            حذف پست
          </v-btn>
          تایید پست (انتشار در نشریه)
          <v-switch
            v-model="data.approved"
            color="success"
            @change="approvePost"
          ></v-switch>
        </v-card-actions>
        <!--END OF TODO-->


      </v-card-actions>
      <v-divider/>
    </v-card>

  </div>
</template>

<script>
  import persianJS from 'persianjs';
  import Comment from '@/components/Comment.vue'

  export default {
    props: ['data'],
    name: "post",
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return persianJs(value.toString()).englishNumber().toString();
      }
    },
    methods: {
      deletePost() {
        console.log(this.$auth)
        console.log(this.data)
      },
      approvePost(e) {
        console.log(e)
      }
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>

</style>
