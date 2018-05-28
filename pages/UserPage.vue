<template>
  <div class="bg-main">
    <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100">

    <v-tabs color="grey lighten-3">
      <v-tab v-for="(item,index) in tabs" :key="index">
        {{item.name}}
      </v-tab>
      <v-tab-item
        v-for="(item1,index1) in tabs" :key="index1">
        <component :is="item1.component"/>
      </v-tab-item>

    </v-tabs>


  </div>
</template>

<script>
  import Posts from '@/components/Posts.vue'
  import Wall from '@/components/Wall.vue'

  export default {
    name: "index",
    data() {
      return {
        active: '',
        tabs: [
          // {
          //   name: 'آخرین پست ها',
          //   component: 'LastPosts'
          // },
          {
            name: 'پست های من',
            component: 'posts'
          },
          {
            name: 'دیوار',
            component: 'wall'
          },
          {
            name: 'ثبت‌نام جشن',
            component: 'register'
          },
          {
            name: 'ترین‌ها',
            component: 'Tarins'
          }
        ]
      }
    },
    created() {

    },
    methods: {
      push(route) {
        console.log("ads")
        this.$router.push({
          path: route,
        })
      }
    },
    components: {
      Wall, Posts
    }
  }
</script>

<style scoped>
  img {
    height: 250px;
  }
</style>
