<template>
  <div class="mb-3">
    <v-card>
      <v-card-text>
        <div class="d-md-flex justify-content-between">
          <!--user name-->
          <div class="align-items-end d-md-flex ">
            <nuxt-link to="">
              <v-avatar size="40px" class="elevation-2">
                <img src="@/static/avatar.png" alt="">
              </v-avatar>
            </nuxt-link>
            <span class="mr-2 body-2">{{data.owner.name}}</span>
          </div>
          <!--post date-->
          <div class="g-text-dates">
            {{data.date | moment('HH:MM jYYYY/jMM/jD') | makeParsi}}
          </div>
        </div>
        <v-divider class="mt-2 mb-2"/>
        <div style="text-align:justify;">
          {{data.text}}
        </div>


      </v-card-text>
      <v-divider/>
      <!--Comments-->
      <v-card-text>
        <comment/>
        <comment/>
      </v-card-text>

      <div class="text-md-center">
        <v-expansion-panel class="text-md-center">
          <v-expansion-panel-content expand-icon="" class="">
            <span class="blue--text" slot="header">
              <span>مشاهده بیشتر</span>
              <v-icon class="blue--text">mdi-chevron-down</v-icon>
            </span>
            <div>
              <v-card>
                <v-card-text>
                  <comment/>
                  <comment/>
                  <comment/>
                </v-card-text>

              </v-card>

            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
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
    components: {
      Comment
    }
  }
</script>

<style scoped>

</style>
