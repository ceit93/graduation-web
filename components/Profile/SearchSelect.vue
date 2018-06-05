<template>
  <v-select
    v-bind:value="value"
    v-on:input="input"
    :rules="rules"
    :items="items"
    :item-text="item_text"
    :item-value="item_value"
    :item-avatar="item_avatar"
    :label="label"
    :placeholder="placeholder"
    :deletable-chips="deletable"
    :required="required"
    :flat="flat"
    :solo="solo"
    :class="style_class"
    :append-icon="append_icon"
    :cache-items="cache_items"
    :dense="dense"
    :combobox="combobox"
    :solo-inverted="solo_inverted"
    autocomplete
    chips
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        :selected="data.selected"
        :key="JSON.stringify(data.item)"
        close
        class="chip--select-multi ceit-chip"
        @input="data.parent.selectItem(data.item)"
      >
        <v-avatar class="ceit-search-avatar">
          <img :src="data.item.avatar">
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template slot="item" slot-scope="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <img :src="data.item.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="ceit-search" v-html="data.item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-select>
</template>

<script>
  export default {
    name: 'Search',
    props: [
      'rules',
      'items',
      'item_text',
      'item_value',
      'value',
      'item_avatar',
      'label',
      'deletable',
      'required',
      'flat',
      'solo',
      'style_class',
      'append_icon',
      'cache_items',
      'dense',
      'combobox',
      'placeholder',
      'solo_inverted'
    ],
    methods: {
      input(value){
        this.$emit('input', value)
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
