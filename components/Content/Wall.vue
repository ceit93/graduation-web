<template>
  <v-card>
    <v-card-text>
      <div class="d-md-flex justify-content-end">
        <v-btn class="success mx-0">
          <v-icon color="white" small>mdi-plus</v-icon>
          پست جدید
        </v-btn>

      </div>
      <div v-for="(post,index) in posts"
           :key="index">
        <post :postData="post"/>

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
    import Post from '~/components/Content/Post.vue'
    export default {
        components: {Post},
        name: "wall",
        data() {
          return {
            posts: []
          }
        },
    }
</script>

<style scoped>

</style>
