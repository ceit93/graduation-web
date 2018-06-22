<template>
  <v-container fluid fill-height v-if="diff > 0">
    <v-layout align-center justify-center row class="mx-0">
      <v-flex xs12 align-center justify-center>
        <!--Credits: http://fareez.info/blog/countdown-timer-using-vuejs/-->
        <v-layout row wrap :class="this.cssClass">
          <v-flex xs3 class="text-xs-center">
            <h1 :class="numbersClass">{{ this.$persianJS.englishNumber(days) }}</h1>
            <p class="iranblack">روز</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 :class="numbersClass">{{ this.$persianJS.englishNumber(hours) }}</h1>
            <p>ساعت</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 :class="numbersClass">{{ this.$persianJS.englishNumber(minutes) }}</h1>
            <p>دقیقه</p>
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            <h1 :class="numbersClass">{{ this.$persianJS.englishNumber(seconds) }}</h1>
            <p>ثانیه</p>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-dialog v-model="dialog" max-width="300px">
              <v-chip color="red" outline dark slot="activator" @click.native.stop="dialog = true">این شمارش‌گر چیه؟</v-chip>
              <v-card>
                <v-card-title><h3 class="red--text darken-4">فقط تا ساعت ۲۳:۵۹ روز جمعه ۱ تیر مهلت تکمیل محتوا برای نشریه را دارید.</h3></v-card-title>
                <v-card-text>
                  <p>پس از مهلت فوق، محتوا برای نشریه به روز نخواهد شد ولی کماکان می‌توانید از طریق این وب‌اپلیکیشن برای دوستان خود دل‌نوشته بنویسید.</p>
                  <p>بدیهی‌است دل‌نوشته‌های نوشته شده پس از تاریخ فوق، فقط در این‌جا و در نسخه آنلاین یادگاری‌ها نمایش داده خواهند شد.</p>
                </v-card-text>
                <v-card-actions class="d-flex justify-content-center">
                  <v-btn color="info" large to="/content">تکمیل محتوا</v-btn>
                  <v-btn outline color="info" large @click.native="dialog = false">بستن</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
          dialog: false
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
            this.$emit('deadline')
          return d
        },
        cssClass: function() {
          if (this.diff > 0)
            return 'ltr mt-5 iranblack light-blue--text text--darken-3 text-xs-center mx-0';
          return 'ltr mt-5 iranblack light-blue--text text--darken-3 text-xs-center mx-0 blink'
        },
        numbersClass: function() {
          if (this.diff < 0)
            return 'red--text'
          return ''
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
