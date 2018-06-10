<template>
  <v-card class="justify-content-center justify-center">
    <v-card-actions class="justify-content-center">
      <v-flex xs12 md6>
        <v-btn large block dark color="info"  append to="new" nuxt>
          <v-icon>bookmark</v-icon>&nbsp;
          ترین جدید پیشنهاد کنید
        </v-btn>
      </v-flex>
    </v-card-actions>
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
    <tarins :perPage="20" :votes="this.votes" :people="this.prettyPeople"></tarins>
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
    export default {
      name: "index",
      components: {Tarins},
      layout: 'content',
      data() {
        return {
          valid: true,
          dialog: false,
          progress: true,
          page: 1
        }
      },
      computed: {
        prettyPeople() {
          let res = []
          for (let person of this.people){
            person.name = this.$persianJS.userName(person)
            person.avatar = this.$helper.avatar(person)
            res.push(person)
          }
          res = this.$helper.sortBy(res, 'std_numbers')
          return res
        },
      },
      async asyncData (context) {
        let {people} = await context.$axios.get('/users/students')
          .then((res) => {
            return { people: res.data }
          }).catch(e => {
            context.error({statusCode: 500, message: 'خطای سرور...'})
          })
        let {votes} = await context.$axios.get('/polls')
          .then(e => {
            return {votes: e.data}
          }).catch(e => {
              context.error({statusCode: 500, message: 'خطای سرور...'})
            return []
          })
        return {
          votes: votes,
          people: people
        }
      },
      notifications: {
        showSuccess: {
          title: 'رای شما ذخیره شد.',
          type: 'success'
        },
        showError: {
          title: 'خطایی رخ داد...',
          type: 'error'
        }
      },
      methods: {
        submit() {
          this.$axios.post('/poll/submit', {
            votes: this.votes
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
