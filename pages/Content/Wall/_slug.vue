<template>
  <div>
    <v-card>
      <v-card-text>
        <search-select
          v-model="search"
          :items="people"
          :item_text="'name'"
          :item_value="'username'"
          :item_avatar="'avatar'"
          :label="'جستجوی ۹۳ای‌ها'"
          :style_class="'input-group--focused'"
          :autocomplete="true"
          :cache_items="true"
          :dense="true"
          :append_icon="'search'"
          :placeholder="'جستجوی یک ۹۳ ای...'"
          @input="gotoWall"
        ></search-select>
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
  import SearchSelect from "~/components/Profile/SearchSelect.vue";
  export default {
    name: "slug",
    layout: 'content',
    data() {
      return {
        search: null
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
    components: {Wall, SearchSelect},
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
      gotoWall(username) {
        this.$nuxt.$router.replace({'path' : this.search})
      }
    }
  }
</script>

<style scoped>
  .ceit-search {
    text-align: right !important;
  }
  .ceit-search-avatar {
    margin-left: 8px !important;
    margin-right: 0px !important;
  }
  .ceit-chip{
    .chip__content{
      padding: 0px 12px 0px 4px !important;
    }
  }
</style>
