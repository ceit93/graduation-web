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
                            <v-subheader>{{tarin.subject}}</v-subheader>
                          </v-flex>
                          <v-flex xs5>
                            <v-select
                              :items="people"
                              item-text="name"
                              item-value="username"
                              :label="tarin.subject"
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
          // this.tarins = await this.$axios.get('polls')
          this.tarins = [
            {subject: 'اجتماعی ترین', approved: true, votes:{}},
            {subject: 'احساسی ترین', approved: true, votes:{}},
            {subject: 'بپیچون ترین', approved: true, votes:{}},
            {subject: 'بدشانس ترین', approved: true, votes:{}},
            {subject: 'پر حرف ترین', approved: true, votes:{}},
            {subject: 'پرکار ترین', approved: true, votes:{}},
            {subject: 'تدریس یار ترین', approved: true, votes:{}},
            {subject: 'تغییر پیدا کرده ترین', approved: true, votes:{}},
            {subject: 'جزوه نویس ترین', approved: true, votes:{}},
            {subject: 'جو بده ترین', approved: true, votes:{}},
            {subject: 'خسته ترین', approved: true, votes:{}},
            {subject: 'خوش خنده ترین', approved: true, votes:{}},
            {subject: 'خوش شانس ترین', approved: true, votes:{}},
            {subject: 'رک ترین', approved: true, votes:{}},
            {subject: 'خوش برخورد ترین', approved: true, votes:{}},
            {subject: 'شاخ ترین', approved: true, votes:{}},
            {subject: 'شکمو ترین', approved: true, votes:{}},
            {subject: 'سم ترین', approved: true, votes:{}},
            {subject: 'خجسته ترین', approved: true, votes:{}},
            {subject: 'شوخ طبع ترین', approved: true, votes:{}},
            {subject: 'کپ زن ترین', approved: true, votes:{}},
            {subject: 'کم پیدا ترین', approved: true, votes:{}},
            {subject: 'مودب ترین', approved: true, votes:{}},
            {subject: 'پر استرس ترین', approved: true, votes:{}},
            {subject: 'نمره بگیر ترین', approved: true, votes:{}},
            {subject: 'ورزشکار ترین', approved: true, votes:{}},
            {subject: 'دوست داشتنی ترین', approved: true, votes:{}},
            {subject: 'یعقوب برو ترین', approved: true, votes:{}},
            {subject: 'خوش اخلاق ترین', approved: true, votes:{}},
            {subject: 'بیخیال ترین', approved: true, votes:{}},
            {subject: 'یخ ترین', approved: true, votes:{}},
            {subject: 'پایه ترین', approved: true, votes:{}},
            {subject: 'خجالتی ترین', approved: true, votes:{}},
            {subject: 'مهربون ترین', approved: true, votes:{}},
            {subject: 'نرد ترین', approved: true, votes:{}},
            {subject: 'با جنبه ترین', approved: true, votes:{}},
            {subject: 'با مرام ترین', approved: true, votes:{}},
            {subject: 'آنلاین ترین', approved: true, votes:{}},
            {subject: 'کم حافظه ترین', approved: true, votes:{}},
            {subject: 'هنرمند ترین', approved: true, votes:{}},
            {subject: 'تیکه پرون ترین', approved: true, votes:{}},
            {subject: 'خوش خواب ترین', approved: true, votes:{}},
            {subject: 'جدی ترین', approved: true, votes:{}},
            {subject: 'دلسوز ترین', approved: true, votes:{}},
            {subject: 'بد امتحان بده ترین', approved: true, votes:{}},
            {subject: 'خونسرد ترین', approved: true, votes:{}},
            {subject: 'رئیس ترین', approved: true, votes:{}},
            {subject: 'آروم ترین', approved: true, votes:{}},
            {subject: 'علاف ترین', approved: true, votes:{}},
            {subject: 'زود سر کلاس برو ترین', approved: true, votes:{}},
            {subject: 'سحرخیز ترین', approved: true, votes:{}},
            {subject: 'زود رنج ترین', approved: true, votes:{}},
            {subject: 'صدا قشنگ ترین', approved: true, votes:{}},
            {subject: 'گیج ترین', approved: true, votes:{}},
            {subject: 'مغرور ترین', approved: true, votes:{}},
            {subject: 'منطقی ترین', approved: true, votes:{}},
            {subject: 'پر انرژی ترین', approved: true, votes:{}},
            {subject: 'پیگیر ترین', approved: true, votes:{}},
            {subject: 'با جذبه ترین', approved: true, votes:{}},
            {subject: 'پر سر و صدا ترین', approved: true, votes:{}},
            {subject: 'بی احساس ترین', approved: true, votes:{}},
            {subject: 'بی تفاوت ترین', approved: true, votes:{}},
            {subject: 'سوال بپرس ترین', approved: true, votes:{}},
            {subject: 'تمدید کن ترین', approved: true, votes:{}},
            {subject: 'جغدترین', approved: true, votes:{}},
            {subject: 'متاخر ترین', approved: true, votes:{}},
            {subject: 'سرکلاس بیرون برو ترین', approved: true, votes:{}},
            {subject: 'خوش تیپ ترین', approved: true, votes:{}},
            {subject: 'تنبل ترین ', approved: true, votes:{}},
            {subject: 'کیوت ترین', approved: true, votes:{}},
            {subject: 'آویزون استاد ترین', approved: true, votes:{}},
            {subject: 'جنتلمن ترین', approved: true, votes:{}},
            {subject: 'سیاسی ترین', approved: true, votes:{}},
            {subject: 'مسئولیت پذیر ترین', approved: true, votes:{}},
            {subject: 'ته نشین ترین', approved: true, votes:{}},
            {subject: 'کلاس بپیچون ترین ', approved: true, votes:{}},
            {subject: 'کافه برو ترین', approved: true, votes:{}},
            {subject: 'غرغرو ترین', approved: true, votes:{}},
            {subject: 'ساکت ترین', approved: true, votes:{}},
            {subject: 'فیلم بین ترین', approved: true, votes:{}},
            {subject: 'کتابخون ترین', approved: true, votes:{}},
            {subject: 'کنسل کن ترین', approved: true, votes:{}},
            {subject: 'عجیب ترین', approved: true, votes:{}},
            {subject: 'پررو ترین', approved: true, votes:{}},
            {subject: 'دست و دلباز ترین', approved: true, votes:{}},
          ]
        },
        async fetchPeople() {
          // this.tarins = await this.$axios.get('people')
          this.people = [
            {username: '9331001', name: 'امیر حقیقتی ملکی'},
            {username: '9331002', name: 'ایمان تبریزیان'},
            {username: '9331003', name: 'عارف حسینی‌کیا'},
            {username: '9331004', name: 'مانا پوستی‌زاده'},
            {username: '9331005', name: 'جعفر جعفری'},
            {username: '9331006', name: 'اصغر اصغری'},
            {username: '9331007', name: 'سیب هوایی'},
            {username: '9331008', name: 'سیب زمینی'},
            {username: '9331009', name: 'خیار خیاری'},
            {username: '9331010', name: 'گلاب گلابی'},
            {username: '9331011', name: 'جعفر جعفری'},
            {username: '9331012', name: 'محمد محمدی'},
          ]
        }
      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
