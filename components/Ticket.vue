<template>
  <v-card>
    <v-card-title
      class="green d-flex justify-content-center">
      <img
        src="@/static/android-chrome-192x192.png"
        class="ticket-title-img"
        alt="">
    </v-card-title>

    <v-card-text
      class="mt-4 text-xs-center">
      <div>
        <p class="text-xs-center">هم ورودی عزیز، ثبت نام شما با مشخصات زیر انجام شد.</p>
      </div>
      <v-divider/>
      <div class="ticket-text mt-3">
        <p>نام : {{data.name}}</p>
        <p>شماره تلفن : {{phone}}</p>
        <p>ایمیل : {{data.email}}</p>
        <p>تعداد افراد همراه : {{family}}</p>
      </div>

    </v-card-text>
    <!--<v-divider/>-->

    <div class="green white--text py-2 text-xs-center" style="font-size: 10px">
      {{footer}}
    </div>
  </v-card>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object
      },
    },
    name: "Ticket",
    data() {
      return {
        footerText: 'جشن در روز 1397/4/28 در ساعت 17:00 در محل آمفی تئاتر مولوی برگزار خواهد شد.'
      }
    },
    computed: {
      phone() {
        return this.$persianJS.englishNumber('' + this.data.phone)
      },
      family() {
        return this.$persianJS.englishNumber('' + this.data.family)
      },
      footer() {
        return this.$persianJS.englishNumber('' + this.footerText)
      }
    }
  }
</script>

<style scoped>
  .ticket-title-img {
    position: absolute;
    width: 70px;
    height: 70px;
  }

  .ticket-text {
    font-size: 1.5rem;
  }
</style>
