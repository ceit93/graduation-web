<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex v-for="(item, index) in studentsArray" :key="index">
        <v-avatar size="100px">
          <img :src="$helper.avatar(item)">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
//    props: ['actions'],
    data(){
      return {
        students: [],
      }
    },
    computed: {
      studentsArray : function() {
        let res = []
        for (let person of this.people){
          person.name = this.$persianJS.userName(person)
          person.avatar = this.$helper.avatar(person)
          res.push(person)
        }
        res = this.$helper.sortBy(res, 'std_numbers')
        return res
      },
    },

    async asyncData (context) {
      let {people} = await context.$axios.get('/users/students')
        .then((res) => {
          return { people: res.data }
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
        return {
        people: people
      }
    }
  }
</script>
<style>
</style>
