<template>
  <div class="mb-3">
    <v-card class="elevation-5">
      <v-card-title primary-title>
        <v-btn icon to="" nuxt>
          <v-avatar :size="40" class="elevation-2">
            <!--TODO: Implement the avatar-->
            <img src="avatar.png" alt="">
          </v-avatar>
        </v-btn>
        <span class="mr-2 body-2">{{data.title}} - برای {{data.to}}</span>
        <span v-if="data.approved">
          <v-chip color="green" text-color="white" small>تایید شده</v-chip>
        </span>
        <span v-else>
          <v-chip color="orange" outline small dark>در انتظار تایید</v-chip>
        </span>
        <v-spacer></v-spacer>
        <span class="grey--text text--lighten-1">
            {{data.date | moment('HH:MM jYYYY/jMM/jD') | makeParsi}}
        </span>
        <v-menu bottom left>
          <v-btn slot="activator" icon>
            <v-icon>more_horiz</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="data.approved">
              <v-list-tile-title class="red--text">عدم تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="!data.approved">
              <v-list-tile-title class="green--text">تایید</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="deletePost">
              <v-list-tile-title class="red--text">حذف پست</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider class="mt-2 mb-2"/>
      <v-card-text>
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
    data() {
      return {
        menu_items: [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' }
        ]
      }
    },
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
