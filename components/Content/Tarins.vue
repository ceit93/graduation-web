<template>
  <v-card>
    <v-card-text>
      <v-layout align-center justify-center row>
        <v-flex>
          <v-card flat justify-center>
            <v-card-title class="justify-content-center">
              ترین‌های خود را انتخاب کنید
            </v-card-title>
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                @click="submit"
                class="success"
              >
                <v-icon>how_to_vote</v-icon>
                ذخیره
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <v-form>
                <v-container fluid>
                  <v-layout row wrap>
                      <v-flex xs12 md6 v-for="tarin in tarins" :key="tarin.subject" v-if="tarin.approved" align-center justify-center>
                        <v-layout row wrap>
                          <v-flex xs3>
                            <v-subheader>{{tarin.title}}</v-subheader>
                          </v-flex>
                          <v-flex xs5>
                            <v-select
                              :items="people"
                              item-text="name"
                              item-value="username"
                              :label="tarin.title"
                              class="input-group--focused"
                              autocomplete
                              deletable-chips
                              chips
                              flat
                            ></v-select>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-content-center">
              <v-btn
                :disabled="!valid"
                @click="submit"
                class="success"
              >
                <v-icon>how_to_vote</v-icon>
                ذخیره
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
      name: 'Tarins',
      data() {
        return {
          tarins: [],
          people: [],
          valid: true,
        }
      },
      mounted() {
        this.fetchPeople()
        this.fetchTarins()
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
        submit () {
          // this.$axios.post('/folanbisar', {data: {
          //
          //   }
          // }).then(e => {
          //   this.showSuccess()
          // }).catch(e => {
          //   this.showError()
          // })
          this.showSuccess()
        },
        async fetchTarins() {
          this.$axios.get('qualifications').then(e => {
            this.tarins = e.data.quals
            console.log('got it!')
          }).catch(e => {
            console.log(e)
            this.showError()
          })
          // this.tarins = [
          //   {title: 'اجتماعی ترین', approved: true},
          //   {title: 'احساسی ترین', approved: true},
          //   {title: 'بپیچون ترین', approved: true},
          //   {title: 'بدشانس ترین', approved: true},
          //   {title: 'پر حرف ترین', approved: true},
          //   {title: 'پرکار ترین', approved: true},
          //   {title: 'تدریس یار ترین', approved: true},
          //   {title: 'تغییر پیدا کرده ترین', approved: true},
          //   {title: 'جزوه نویس ترین', approved: true},
          //   {title: 'جو بده ترین', approved: true},
          //   {title: 'خسته ترین', approved: true},
          //   {title: 'خوش خنده ترین', approved: true},
          //   {title: 'خوش شانس ترین', approved: true},
          //   {title: 'رک ترین', approved: true},
          //   {title: 'خوش برخورد ترین', approved: true},
          //   {title: 'شاخ ترین', approved: true},
          //   {title: 'شکمو ترین', approved: true},
          //   {title: 'سم ترین', approved: true},
          //   {title: 'خجسته ترین', approved: true},
          //   {title: 'شوخ طبع ترین', approved: true},
          //   {title: 'کپ زن ترین', approved: true},
          //   {title: 'کم پیدا ترین', approved: true},
          //   {title: 'مودب ترین', approved: true},
          //   {title: 'پر استرس ترین', approved: true},
          //   {title: 'نمره بگیر ترین', approved: true},
          //   {title: 'ورزشکار ترین', approved: true},
          //   {title: 'دوست داشتنی ترین', approved: true},
          //   {title: 'یعقوب برو ترین', approved: true},
          //   {title: 'خوش اخلاق ترین', approved: true},
          //   {title: 'بیخیال ترین', approved: true},
          //   {title: 'یخ ترین', approved: true},
          //   {title: 'پایه ترین', approved: true},
          //   {title: 'خجالتی ترین', approved: true},
          //   {title: 'مهربون ترین', approved: true},
          //   {title: 'نرد ترین', approved: true},
          //   {title: 'با جنبه ترین', approved: true},
          //   {title: 'با مرام ترین', approved: true},
          //   {title: 'آنلاین ترین', approved: true},
          //   {title: 'کم حافظه ترین', approved: true},
          //   {title: 'هنرمند ترین', approved: true},
          //   {title: 'تیکه پرون ترین', approved: true},
          //   {title: 'خوش خواب ترین', approved: true},
          //   {title: 'جدی ترین', approved: true},
          //   {title: 'دلسوز ترین', approved: true},
          //   {title: 'بد امتحان بده ترین', approved: true},
          //   {title: 'خونسرد ترین', approved: true},
          //   {title: 'رئیس ترین', approved: true},
          //   {title: 'آروم ترین', approved: true},
          //   {title: 'علاف ترین', approved: true},
          //   {title: 'زود سر کلاس برو ترین', approved: true},
          //   {title: 'سحرخیز ترین', approved: true},
          //   {title: 'زود رنج ترین', approved: true},
          //   {title: 'صدا قشنگ ترین', approved: true},
          //   {title: 'گیج ترین', approved: true},
          //   {title: 'مغرور ترین', approved: true},
          //   {title: 'منطقی ترین', approved: true},
          //   {title: 'پر انرژی ترین', approved: true},
          //   {title: 'پیگیر ترین', approved: true},
          //   {title: 'با جذبه ترین', approved: true},
          //   {title: 'پر سر و صدا ترین', approved: true},
          //   {title: 'بی احساس ترین', approved: true},
          //   {title: 'بی تفاوت ترین', approved: true},
          //   {title: 'سوال بپرس ترین', approved: true},
          //   {title: 'تمدید کن ترین', approved: true},
          //   {title: 'جغدترین', approved: true},
          //   {title: 'متاخر ترین', approved: true},
          //   {title: 'سرکلاس بیرون برو ترین', approved: true},
          //   {title: 'خوش تیپ ترین', approved: true},
          //   {title: 'تنبل ترین ', approved: true},
          //   {title: 'کیوت ترین', approved: true},
          //   {title: 'آویزون استاد ترین', approved: true},
          //   {title: 'جنتلمن ترین', approved: true},
          //   {title: 'سیاسی ترین', approved: true},
          //   {title: 'مسئولیت پذیر ترین', approved: true},
          //   {title: 'ته نشین ترین', approved: true},
          //   {title: 'کلاس بپیچون ترین ', approved: true},
          //   {title: 'کافه برو ترین', approved: true},
          //   {title: 'غرغرو ترین', approved: true},
          //   {title: 'ساکت ترین', approved: true},
          //   {title: 'فیلم بین ترین', approved: true},
          //   {title: 'کتابخون ترین', approved: true},
          //   {title: 'کنسل کن ترین', approved: true},
          //   {title: 'عجیب ترین', approved: true},
          //   {title: 'پررو ترین', approved: true},
          //   {title: 'دست و دلباز ترین', approved: true},
          // ]
        },
        async fetchPeople() {
          this.$axios.get('/users/students').then(e => {
            this.people = e.data
          }).catch(e => {
            console.log(e)
            this.showError()
          })
        }
      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
