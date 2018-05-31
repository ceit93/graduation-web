<template>
  <div class="bg-main">
    <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100">
    <v-tabs icons-and-text dark color="light-blue darken-2">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="(item,index) in tabs" :key="index">
        {{item.name}}
        <v-icon>{{item.icon}}</v-icon>
      </v-tab>
      <v-tab-item
        v-for="(item1,index1) in tabs" :key="index1">
        <v-card flat>
          <component :is="item1.component"/>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import Posts from '~/components/Content/Posts.vue'
  import Wall from '~/components/Content/Wall.vue'
  import Tarins from '~/components/Content/Tarins.vue'
  import TarinForm from '~/components/Content/TarinForm.vue'

  export default {
    name: "index",
    data() {
      return {
        active: '',
        tabs: [
          {
            name: 'دل‌نوشته‌ها',
            icon: 'add_comment',
            component: 'Posts'
          },
          {
            name: 'دیوار من',
            icon: 'list',
            component: 'Wall'
          },
          {
            name: 'ترین‌ها',
            icon: 'star',
            component: 'Tarins'
          },
          {
            name: 'افزودن ترین دلخواه',
            icon: 'add',
            component: 'TarinForm'
          },
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
      Wall, Posts, Tarins, TarinForm
    }
  }
</script>

<style scoped>
</style>
