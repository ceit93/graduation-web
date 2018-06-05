<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row class="mx-0">
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap :class="this.cssClass">
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ this.$persianJS.englishNumber(days) }}</h1>
            <p class="iranblack">روز</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ this.$persianJS.englishNumber(hours) }}</h1>
            <p>ساعت</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ this.$persianJS.englishNumber(minutes) }}</h1>
            <p>دقیقه</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 class="">{{ this.$persianJS.englishNumber(seconds) }}</h1>
            <p>ثانیه</p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6 v-if="!button.hidden">
        <v-layout column>
          <v-btn large :outline="this.button.outline" :disabled="this.button.disabled" color="info" nuxt :to="this.button.to">{{this.button.title}}</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "Countdown",
      props : ['date', 'button'],
      mounted() {
        window.setInterval(() => {
          this.now = Math.trunc((new Date()).getTime() / 1000)
        },1000)
      },
      data() {
        return {
          now: Math.trunc((new Date()).getTime() / 1000),
        }
      },
      computed: {
        unix: function () {
          return Math.trunc(Date.parse(this.date) / 1000)
        },
        seconds: function () {
          if (this.diff > 0)
            return ((this.unix - this.now) % 60).toString()
          return '0'
        },
        minutes: function() {
          if (this.diff > 0)
            return (Math.trunc((this.unix - this.now) / 60) % 60).toString()
          return '0'
        },
        hours: function() {
          if (this.diff > 0)
            return (Math.trunc((this.unix - this.now) / 60 / 60) % 24).toString()
          return '0'
        },
        days: function() {
          if (this.diff > 0)
            return (Math.trunc((this.unix - this.now) / 60 / 60 / 24)).toString()
          return '0'
        },
        diff: function() {
          let d = this.unix - this.now
          if (d <= 0)
            this.$emit('end')
          return d
        },
        cssClass: function() {
          if (this.diff > 0)
            return 'ltr mt-5 iranblack light-blue--text text--darken-3 text-xs-center mx-0';
          return 'ltr mt-5 iranblack light-blue--text text--darken-3 text-xs-center mx-0 blink'
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
 .blink {
   animation: blinker 1.5s linear infinite;
 }
 @keyframes blinker {
   50% {
     opacity: 0.2;
   }
 }
</style>
