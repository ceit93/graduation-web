<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        یک ترین دلخواه که در لیست نیست اضافه کنید:
        <div class="row">
          <div class="xs8 md8 lg8">
            <v-text-field
            v-model="subject"
            :rules="subjectRules"
            label="چیچی‌ترین؟"
            required
            ></v-text-field>
          </div>
          <div class="xs4 md4 lg4">
            <v-btn
              :disabled="!valid"
              @click="submit"
              class="success"
            >
              ثبت یک ترین
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
      name: 'Tarins',
      data() {
        return {
          tarins: {},
          valid: true,
          subject: '',
          subjectRules: [
            v => !!v || 'ترین مورد نظر خود را وارد کنید',
          ],
        }
      },
      mounted() {
        this.fetchTarins()
      },
      methods: {
        submit () {
          if (this.$refs.form.validate()) {
            // Native form submission is not yet supported
            axios.post('/api/submit', {
              name: this.name,
              email: this.email,
              select: this.select,
              checkbox: this.checkbox
            })
          }
        },
        clear () {
          this.$refs.form.reset()
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
        }
      }
    }
</script>

<style scoped>
  .tarins-panel {
    direction: rtl;
  }
</style>
