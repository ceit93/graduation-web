<template>
  <v-content class="landing-content">
    <div class="cover-bg">
      <img class="cover-img d-md-block" src="@/static/ceit93.jpg" alt="">
    </div>
    <v-container fluid >
      <v-layout align-center justify-center row class="mx-0">
        <v-flex xs11>
          <div>
            <v-card-text>
              <h1 class="white--text text-xs-center ceit-display-1">آیین یادبود فارغ‌التحصیلی دانشجویان ورودی ۱۳۹۳</h1>
            </v-card-text>
            <v-card-text>
              <p class="white--text text-xs-center">اکنون</p>
              <p class="white--text text-xs-center">ایستاده بر فراز این مسیر پر پیچ‌وخم</p>
              <p class="white--text text-xs-center">بالندگی را می‌نگریم و رشد را به نظاره می‌ایستیم</p>
              <p class="white--text text-xs-center">چهار سال دیگر از عمر آبی این آسمان گذشت</p>
              <p class="white--text text-xs-center">و ما زندگی را تنفس نمودیم و درس را بهانه</p>
              <p class="white--text text-xs-center">حال هنگامه جشن است و سرور</p>
              <p class="white--text text-xs-center">باز دیگر گرد هم می‌آییم تا این شادی را، به تعداد برگ برگ خاطراتمان تقسیم کنیم</p>
            </v-card-text>
            <v-card-text class="white--text">
              <p class="text-xs-center iranblack light-blue--text text--darken-3">:زمان باقی‌‌مانده برای شروع</p>
              <countdown date="June 6, 2018" :button="this.button"></countdown>
            </v-card-text>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Countdown from "../components/Profile/Countdown";
  export default {
    data() {
      return {
        button: {
          hidden: true
        }
      }
    },
    name: "landing",
    components: {Countdown},
    layout: 'landing',
  }
</script>

<style>
  @media (max-width: 768px) {
    .ceit-display-1 {
      font-size: 1.6rem;
    }
    .ceit-subheading {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    .ceit-display-1 {
      font-size: 2.3rem;
    }

    .ceit-subheading {
      font-size: 1.3rem;
    }
  }
  .landing-content {
    background-color: black;
  }
  .cover-bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.2;
    filter: blur(2px);
  }
  .cover-img {
    width: 100%;
    height: 100%;
  }
  .iranblack {
    font-family: Iranblack;
  }
</style>
