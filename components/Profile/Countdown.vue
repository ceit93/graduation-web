<template>
  <v-container fluid fill-height class="grey lighten-5">
    <v-layout align-center justify-center row>
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap class="ltr mt-5 iranblack light-blue--text text--darken-3 text-xs-center">
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ convertToPersian(days) }}</h1>
            <p class="iranblack">روز</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ convertToPersian(hours) }}</h1>
            <p>ساعت</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ convertToPersian(minutes) }}</h1>
            <p>دقیقه</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ convertToPersian(seconds) }}</h1>
            <p>ثانیه</p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout column>
          <v-btn large color="info" nuxt to="/content">تکمیل محتوا</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "Countdown",
      mounted() {
        window.setInterval(() => {
          this.now = Math.trunc((new Date()).getTime() / 1000)
        },1000)
      },
      props : ['date'],
      data() {
        return {
          now: Math.trunc((new Date()).getTime() / 1000),
        }
      },
      methods: {
        convertToPersian(num) {
          return num.replace(/\d+/g, function(digit) {
            var ret = ''
            for (var i = 0, len = digit.length; i < len; i++) {
              ret += String.fromCharCode(digit.charCodeAt(i) + 1728)
            }
            return ret
          })
        }
      },
      computed: {
        unix: function () {
          return Math.trunc(Date.parse(this.date) / 1000)
        },
        seconds: function () {
          return ((this.unix - this.now) % 60).toString()
        },
        minutes: function() {
          return (Math.trunc((this.unix - this.now) / 60) % 60).toString()
        },
        hours: function() {
          return (Math.trunc((this.unix - this.now) / 60 / 60) % 24).toString()
        },
        days: function() {
          return (Math.trunc((this.unix - this.now) / 60 / 60 / 24)).toString()
        }
      }
    }
</script>

<style scoped>
 .iranblack {
   font-family: Iranblack;
 }
 .ltr {
   direction: ltr;
 }
</style>
