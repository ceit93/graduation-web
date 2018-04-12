<template>
  <div class="d-md-flex mt-2 mb-1">
    <div class="ml-4">
      <v-tooltip bottom>

        <span slot="activator">
          <nuxt-link to="">
            <v-avatar size="35px" class="elevation-2">
                <img src="@/static/avatar2.png" alt="">
            </v-avatar>
          </nuxt-link>
        </span>

        <span>احسان موسوی</span>
      </v-tooltip>

    </div>
    <div class="speech-bubble bg-main pa-3" style="flex-grow: 1;">
      آره یادش بخیر خیلی فیلم مزخرفی رفتیم دیدیم. بعدشم بستنی شاد!
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment"
  }
</script>

<style scoped>

  .speech-bubble {
    position: relative !important;
    /*background: #00aabb;*/
    border-radius: .4em;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 40%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left-color: rgb(237, 241, 245);
    border-right: 0;
    border-top: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
</style>
