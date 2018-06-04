<template>
  <div>
    <v-card>
      <v-card-text>
        <v-select
          append-icon="search"
          label="جستجوی ۹۳ای‌ها"
          :items="people"
          item-text="name"
          item-value="username"
          item-avatar="avatar"
          v-model="search"
          @input="gotoWall"
          solo
          autocomplete
          cache-items
          combobox
          dense
        >
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-avatar>
                <img :src="data.item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="ceit-search" v-html="data.item.name"></v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
      </v-card-text>
    </v-card>
    <wall :user="user"
      @approved="approvePost"
      @deleted="removePost"
      @disapproved="disapprovePost"></wall>
  </div>
</template>

<script>
  import Wall from "~/components/Content/Wall";
  export default {
    name: "slug",
    layout: 'content',
    data() {
      return {
        search: ''
      }
    },
    async asyncData (context) {
      let user = await context.$axios.get(`users/${context.params.slug}`)
        .then((res) => {
          return res.data.user
        }).catch(e => {
          return { }
        })
      let people = await context.$axios.get('users/students')
        .then(e => {
          return e.data
        }).catch(e => {
          return {}
        })
      return {
        user: user,
        people: people
      }
    },
    components: {Wall},
    async mounted() {
      this.$vuetify.goTo('#tabs', {
        duration: 300,
        offset: -100,
        easing: 'easeInOutCubic'
      })
    },
    methods: {
      approvePost(index){
        console.log(index)
        this.user.posts[index].approved = true
      },
      disapprovePost(index){
        console.log(index)
        this.user.posts[index].approved = false
      },
      removePost(index) {
        console.log(index)
        this.user.posts.splice(index, 1);
      },
      gotoWall() {
        let username = this.search.username
        this.$nuxt.$router.replace({'path' : username})
      }
    }
  }
</script>

<style scoped>
  .ceit-search {
    text-align: right !important;
  }
</style>
