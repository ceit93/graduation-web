<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <search-select
          v-model="owner"
          :rules="rules.recipient"
          :items="people"
          :item_text="'name'"
          :item_value="'_id'"
          :item_avatar="'avatar'"
          :label="'گیرنده (در صورتی که برای خود می نویسید نیز اسم خود را انتخاب کنید)'"
          :placeholder="'گیرنده دل‌نوشته...'"
          :prepend_icon="'contacts'"
          :style_class="'input-group--focused'"
          :required="true"
          :autocomplete="true"
          :deletable_chips="true"
          :clearable="true"
          :cache_items="true"
          :dense="true"
          :flat="true"
        ></search-select>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="post.title"
          :rules="rules.title"
          label="عنوان دل‌نوشته"
          append-icon="title"
          required
        />
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="post.body"
          :rules="rules.body"
          box
          required
          multi-line
          label="متن دل‌نوشته"
          placeholder="یادش بخیر اون زمونا..."/>
      </v-flex>
      <v-flex xs6 v-if="post.image !== ''">
        <img :src="post.image">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SearchSelect from "~/components/Profile/SearchSelect.vue";
  export default {
    name: "PostEditor",
    props: ['people', 'post', 'owner'],
    data() {
      return {
        rules: {
          recipient: [v => !!v || 'مشخص کنید این دل‌نوشته برای کیست'],
          title: [v => !!v || 'وارد کردن عنوان الزامی است'],
          body: [v => !!v || 'وارد کردن متن الزامی است'],
        },
      }
    },
    components: {SearchSelect},
  }
</script>

<style lang="scss" scoped>
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
