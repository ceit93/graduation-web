<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card flat class="justify-content-center justify-center" height="100%">
          <v-card-text class="text-xs-center">
            <div class="text-xs-center">
              <v-pagination
                :length="pagesCount"
                next-icon="chevron_left"
                prev-icon="chevron_right"
                color="info"
                v-model="page"
                circle class="ceit-ltr">
              </v-pagination>
              <p class="grey--text">صفحه {{this.$persianJS.englishNumber(page)}} از {{this.$persianJS.englishNumber(pagesCount)}}</p>
            </div>
            <v-container>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm12 md6 v-for="tarin in this.votesChunk()" :key="tarin._id" align-center justify-center class="text-xs-center">
                  <v-layout row wrap justify-center class="text-xs-center mx-0">
                    <v-flex xs12 lg8 class="mx-2">
                      <search-select
                        class="tarins-select"
                        v-model="tarin.candidate"
                        :placeholder="tarin.qualification.title + ' ۹۳ای ...'"
                        :items="people"
                        :item_text="'name'"
                        :item_value="'_id'"
                        :item_avatar="'avatar'"
                        :label="tarin.qualification.title"
                        :style_class="'input-group--focused'"
                        :autocomplete="true"
                        :deletable_chips="true"
                        :clearable="true"
                        :cache_items="true"
                        :append_icon="'star'"
                        :dense="true"
                      ></search-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <p class="grey--text">صفحه {{this.$persianJS.englishNumber(page)}} از {{this.$persianJS.englishNumber(pagesCount)}}</p>
            <div class="text-xs-center">
              <v-pagination
                :length="pagesCount"
                next-icon="chevron_left"
                prev-icon="chevron_right"
                color="info"
                v-model="page"
                circle class="ceit-ltr">
              </v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import SearchSelect from "../../Profile/SearchSelect";
    export default {
      name: 'Tarins',
      components: {SearchSelect},
      props: ['people', 'votes', 'perPage'],
      data() {
        return {
          dialog: false,
          page: 1,
        }
      },
      computed: {
        pagesCount() {
          return Math.ceil(this.people.length / this.perPage)
        }
      },
      methods: {
        votesChunk(){
          let start = this.perPage * (this.page - 1)
          console.log(this.votes.slice(start, start + this.perPage))
          return this.votes.slice(start, start + this.perPage)
        }
      },
      mounted(){
        console.log('hello!')
      },
      beforeUpdate(){
        this.$emit('beforeUpdate')
        console.log('updating...')
      },
      updated(){
        this.$emit('updated')
        console.log('updated.')
      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
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
