<template>
    <v-container fluid style="background-color: rgba(85, 85, 85, 0.38)">
        <v-layout align-center justify-center row class="mx-0">

            <v-card tile flat
                    v-for="(item, index) in studentsArray" :key="index" :href="'/content/wall/' + item.username">
                    <v-avatar tile size="100px"><img :src="item.avatar">
                        <div class="cover"></div>
                    </v-avatar>
                                    <!--<span>{{item.name}}</span>-->
            </v-card>
                    <!--</v-btn>-->
                <!--</div>-->
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
    .cover{
        position: absolute;
        background-color: rgba(62, 62, 62, 0.38);
        width: 100%;
        height: 100%;
    }
    .cover:hover{
        background-color: rgba(132, 132, 132, 0);
    }
</style>
