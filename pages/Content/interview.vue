<template>
  <v-card class="justify-content-center justify-center">
    <v-card-title class="justify-content-center">
      <h3>ترین‌های خود را انتخاب کنید</h3>
    </v-card-title>
    <v-card-actions class="justify-content-center">
      <v-btn
        :disabled="!valid"
        @click="submit"
        class="info"
      >
        <v-icon>how_to_vote</v-icon>
        ذخیره کوتاه‌پاسخ‌ها
      </v-btn>
      <v-dialog v-model="dialog">
        <v-chip color="info" outline dark slot="activator" @click.native.stop="dialog = true" small>راهنمایی (؟)</v-chip>
        <v-card>
          <v-card-text>
            <h3>اولین چیزی که به ذهنت میرسه چیه؟</h3>
            <p>
              جواب هر سوال رو در کوتاه‌ترین حالت ممکن بدید.
            </p>
            <p>
              هر زمانی که خواستید میتونید از این صفحه خارج شید و بعدا برگردید به سراغ کوتاه‌پاسخ‌هاتون و اون‌هارو رو ویرایش کنید.
            </p>
          </v-card-text>
          <v-card-actions class="d-flex justify-content-center">
            <v-btn color="info" large @click.native="dialog = false">باشه</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <interviews :interviews="this.interviews" :per-page="10"></interviews>
    <v-card-actions class="justify-content-center">
      <v-btn
        :disabled="!valid"
        @click="submit"
        class="info"
      >
        <v-icon>how_to_vote</v-icon>
        ذخیره رای
      </v-btn>
      <v-dialog v-model="dialog">
        <v-chip color="info" outline dark slot="activator" @click.native.stop="dialog = true" small>راهنمایی (؟)</v-chip>
        <v-card>
          <v-card-text>
            <h3>در طول ۴ سال گذشته از نظر شما «ترین‌های» ۹۳‌ای کیا بودن؟!</h3>
            <p>
              برای هر «ترین» کاندیدای خودتون رو انتخاب کنید و بعدش که انتخابتون تموم شد با زدن دکمه «ذخیره رای» رای‌تون رو ذخیره کنید.
            </p>
            <p>
              هر زمانی که خواستید میتونید از این صفحه خارج شید و بعدا برگردید به سراغ رای‌هاتون و اون‌هارو رو ویرایش کنید.
            </p>
          </v-card-text>
          <v-card-actions class="d-flex justify-content-center">
            <v-btn color="info" large @click.native="dialog = false">باشه</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Tarins from "~/components/Content/Tarins/Tarins";
  import Interviews from "../../components/Content/Interviews";
  export default {
    name: "interview",
    components: {Interviews},
    layout: 'content',
    data(){
      return {
        dialog: false,
        valid: true
      }
    },
    mounted() {
      this.$vuetify.goTo('#tabs', {
        duration: 300,
        offset: -100,
        easing: 'easeInOutCubic'
      })
    },
    notifications: {
      showSuccess: {
        title: 'کوتاه‌پاسخ‌های شما ذخیره شدند.',
        type: 'success'
      },
      showError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      }
    },
    asyncData (context) {
      return context.$axios.get('/interviews')
        .then((res) => {
          return { interviews: res.data }
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
    },
    methods: {
      submit() {
        this.$axios.post('/interviews/submit', {
          interviews: this.interviews
        }).then(e => {
          this.showSuccess()
        }).catch(e => {
          this.showError()
        })
      }
    }
  }
</script>

<style scoped>
</style>
