<template>
  <div class="bg-main">
    <img src="@/static/ceit-poster.jpg" alt="" class="g-w-100">

    <div>
      <tabs class="ma-0" :options="{ useUrlFragment: false }">
        <tab v-for="(item,index) in tabs"
             :key="index"
             :name="item.name">
          <nuxt-child/>

        </tab>
      </tabs>
    </div>


  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        active: '',
        tabs: [
          {
            name: 'آخرین پست ها'
          },
          {
            name: 'پست های من'
          },
          {
            name: 'دیوار'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  img {
    height: 250px;
  }
</style>
