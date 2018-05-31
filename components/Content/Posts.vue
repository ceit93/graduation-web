<template>
  <v-card>
    <v-card-text>
      <v-card>
        <v-form v-model="valid" lazy-validation ref="post">
          <v-card-title class="justify-content-center">
            <h3 class="title">دل‌نوشته جدید ثبت کنید</h3>
            <span class="caption grey--text text--darken-1">*می‌توانید دل‌نوشته جدید ثبت‌ کنید. همچنین می‌توانید از منوی سمت چپ هر دل‌نوشته، آن را پاک کنید.</span>
          </v-card-title>
          <v-card-text>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
              v-model="composed.to"
              :items="people"
              item-text="name"
              item-value="username"
              label="دل‌نوشته برای چه کسی است؟ (در صورتی که برای خود می نویسید نیز اسم خود را انتخاب کنید)"
              class="input-group--focused"
              required
              autocomplete
              deletable-chips
              chips
              flat
            ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="composed.title"
                  label="عنوان دل‌نوشته"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="composed.body" box multi-line label="متن دل‌نوشته" placeholder="یادش بخیر اون زمونا..."></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
          <v-card-actions class="d-flex justify-content-center">
          <v-btn>
            <v-icon small>cloud_upload</v-icon>
            آپلود عکس
          </v-btn>
          <v-btn color="success" @click="submitPost">
            <v-icon small>check</v-icon>
            ثبت پست
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
      <v-divider></v-divider>
      <v-card>
        <v-card-title class="justify-content-center">
          <h3 class="title">دل‌نوشته‌های ثبت‌شده توسط من</h3>
        </v-card-title>
        <v-card-text>
          <div v-for="(post,index) in posts" :key="index">
            <post :postData="post" v-on:removeMe="removePost(index)"/>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  import Post from '~/components/Content/Post.vue'

  export default {
    name: "posts",
    data() {
      return {
        valid: true,
        event: '',
        composed: {
          to: '',
          title: '',
          body: ''
        },
        posts: [
          {
            _id: '_dummy_id',
            title: 'آری اینچنین بود ای برادر',
            body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
            date: '23:23 2018/5/12',
            approved: true,
            user: {
              id: '_dummydata',
              username: '9331009',
              name: 'امیر حقیقتی ملکی'
            },
            to: {
              id: '_dummydata',
              username: '9331031',
              name: 'مانا پوستی‌زاده'
            }
          },
          {
            _id: '_dummy_id',
            title: 'آری اینچنین بود ای برادر',
            body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
            date: '23:23 2018/5/12',
            approved: true,
            user: {
              id: '_dummydata',
              username: '9331009',
              name: 'امیر حقیقتی ملکی'
            },
            to: {
              id: '_dummydata',
              username: '9331009',
              name: 'امیر حقیقتی ملکی'
            }
          },
        ],
        people: []
      }
    },
    mounted() {
      this.fetchPeople()
    },
    notifications: {
      showError: {
        title: 'خطایی رخ داد...',
        type: 'error'
      },
      showSuccess: {
        title: 'دل‌نوشته شما با موفقیت ثبت شد.',
        type: 'success'
      }
    },
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return persianJs(value.toString()).englishNumber().toString();
      }
    },
    methods:{
      async fetchPeople() {
        // this.tarins = await this.$axios.get('people')
        this.people = [
          {username: '9331001', name: 'خیار خیاری'},
          {username: '9331002', name: 'ایمان تبریزیان'},
          {username: '9331003', name: 'عارف حسینی‌کیا'},
          {username: '9331004', name: 'مانا پوستی‌زاده'},
          {username: '9331005', name: 'جعفر جعفری'},
          {username: '9331006', name: 'اصغر اصغری'},
          {username: '9331007', name: 'سیب هوایی'},
          {username: '9331008', name: 'سیب زمینی'},
          {username: '9331009', name: 'امیر حقیقتی ملکی'},
          {username: '9331010', name: 'گلاب گلابی'},
          {username: '9331011', name: 'جعفر جعفری'},
          {username: '9331012', name: 'محمد محمدی'},
        ]
      },
      submitPost(){
        if(this.$refs.post.validate()){

          // Finding the recipient
          let recipient = {}
          for (let i=0; i < this.people.length; i++)
            if (this.people[i].username === this.composed.to)
              recipient = this.people[i]
          // this.$axios.post('/post/add', {data:{
          //     title: this.composed.title,
          //     body: this.composed.body,
          //     images: [],
          //     user: this.$auth.user,
          //     to: author,
          //     approved: false,
          //     date: moment('HH:MM jYYYY/jMM/jD')
          //   }}).then(e => {
          //   this.showSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
          // TODO: complete this
          this.posts.push({
            title: this.composed.title,
            body: this.composed.body,
            images: [],
            user: this.$auth.user,
            to: recipient,
            approved: false,
            date: '23:23 2018/5/12',
          })
          this.showSuccess()
        }
      },
      removePost(index){
        console.log(index)
        this.posts.splice(index, 1);
        this.$nuxt.$router.replace({'path' : '/content'})
      }
    },
    components: {
      Post
    }
  }
</script>

<style scoped>

</style>
