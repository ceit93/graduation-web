<template>
  <v-card>
    <v-card-text>
      <v-layout align-center justify-center row>
        <v-flex>
          <v-card flat justify-center>
            <v-card-title class="justify-content-center">
              <h3>ترین‌های خود را انتخاب کنید</h3>
            </v-card-title>
            <v-form ref="tarins" @submit="submit">
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                type="submit"
                class="success"
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
            <v-card-text>
                <v-container fluid>
                  <v-layout row wrap class="text-xs-center mx-0">
                    <v-flex xs12 md6 v-for="tarin in votes" :key="tarin._id" align-center justify-center class="text-xs-center">
                      <v-layout row wrap class="text-xs-center mx-0">
                        <v-flex xs3 class="text-xs-center">
                          <v-subheader>{{tarin.qualification.title}}</v-subheader>
                        </v-flex>
                        <v-flex xs6>
                          <search-select
                            v-model="tarin.candidate"
                            :items="people"
                            :item_text="'name'"
                            :item_value="'objectID'"
                            :item_avatar="'avatar'"
                            :label="tarin.qualification.title"
                            :style_class="'input-group--focused'"
                            :autocomplete="true"
                            :deletable_chips="true"
                            :cache_items="true"
                            :append_icon="'star'"
                            :chips="true"
                            :dense="true"
                          ></search-select>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                type="submit"
                class="success"
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
                      هر زمانی که خواستید میتونید از این صفحه خارج شید و بعدا برگردید به سراغ رای‌هاتون و اون‌ها رو ویرایش کنید.
                    </p>
                  </v-card-text>
                  <v-card-actions class="d-flex justify-content-center">
                    <v-btn color="info" large @click.native="dialog = false">باشه</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
    import SearchSelect from "../../Profile/SearchSelect";
    export default {
      name: 'Tarins',
      components: {SearchSelect},
      props: ['people', 'votes'],
      data() {
        return {
          valid: true,
          dialog: false
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
        submit (e) {
          e.preventDefault()
          this.$axios.post('/poll/submit', {
            votes: this.votes
          }).then(e => {
            this.showSuccess()
          }).catch(e => {
            this.showError()
          })
        },
      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
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
