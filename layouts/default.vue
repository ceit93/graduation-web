<template>
  <div>
    <v-app style="font-family: IRANSans !important;background-color: #edf1f5 ">
      <div class="container-fluid">
        <div class="row">
          <!--toolbar-->
          <div class="col-md-10 g-toolbar light-color pr-5 justify-space-between align-items-center">
            <div class="d-md-flex">
              <div class="pa-3 g-hovered">
                <v-icon color="white" small>mdi-settings-outline</v-icon>
                <span class="pa-1">تنظیمات</span>
              </div>
              <div class="pa-3 g-hovered">
                <v-icon color="white" small>mdi-bell-outline</v-icon>
                <span class="pa-1">رخدادها</span>
                <v-icon color="white" small>mdi-chevron-down</v-icon>
              </div>
            </div>

            <div>
              <v-text-field solo label="جستجو..." v-model="first"/>
            </div>


          </div>
          <!--side-profiler-->
          <div class="col-md-2 g-side-profiler white elevation-6 d-md-flex justify-content-center align-items-center">
            <div class="text-md-center">
              <v-avatar size="150px"
                        class="elevation-8">
                <img src="@/static/avatar.png" alt="">
              </v-avatar>

              <p class="headline">{{profileData.name}}</p>
              <p class="title" style="font-family: IRANSans;">{{makeParsi(profileData.stdNumber)}}</p>

              <v-btn color="red" outline @click="logout">
                خروج
              </v-btn>

            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10 pa-0">
            <nuxt/>
          </div>
        </div>
      </div>

    </v-app>

  </div>
</template>

<script>
  import persianJs from 'persianjs';

  export default {

    data() {
      return {
        first: '',
        toolbarItems: [
          {
            title: 'تنظیمات'
          },
          {
            title: 'رخداد ها'
          },

        ],
        profileData: {
          name: 'سید عارف حسینی کیا',
          stdNumber: '9331034'
        },

      }
    },
    mounted() {

    },
    methods: {
      makeParsi(num) {
        return persianJs(num).englishNumber().toString();
      },
      async logout() {
        await this.$auth.logout()
        this.$nuxt.$router.replace({'path' : '/login'})
      }
    },
  }
</script>

<style>
  html {
    direction: rtl;
    text-align: right !important;
    /*font-family:IRANSans !important;*/
  }
</style>
