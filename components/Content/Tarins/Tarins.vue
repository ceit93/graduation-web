<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card flat class="justify-content-center justify-center" height="100%">
          <v-card-text class="text-xs-center">
            <v-container>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 sm12 md6 v-for="tarin in votes" :key="tarin._id" align-center justify-center class="text-xs-center">
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
      props: ['people', 'votes'],
      data() {
        return {
          dialog: false
        }
      },
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
