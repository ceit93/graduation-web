<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <v-card>
    <v-card-text>
      <v-form v-model="valid" lazy-validation ref="post" @submit="submitPost">
        <v-card>
          <v-card-title class="justify-content-center">
            <h3 class="title">دل‌نوشته جدید ثبت کنید</h3> &nbsp;
            <span class="caption grey--text text--darken-1">*می‌توانید دل‌نوشته جدید ثبت‌ کنید. همچنین می‌توانید پس از ثبت، از منوی سمت چپ هر دل‌نوشته، آن را پاک کنید.</span>
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
            <input :v-model="composed.file" name="image" type="file" ref="file" accept="image/*" style="display: none;">
            <v-btn @click="clickFile" type="button">
              <v-icon small>cloud_upload</v-icon>
              آپلود عکس
            </v-btn>
            <v-btn color="success" type="submit">
              <v-icon small>check</v-icon>
              ثبت پست
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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
  import Dropzone from 'nuxt-dropzone'

  export default {
    name: "posts",

    data() {
      return {
        removeFlag: true,
        uploadOptions: {
          url: (files) => {
            this.composed.file = files[0];
            return "";
          },
          maxFiles: 1,
          addRemoveLinks: true,
          acceptedFiles: 'image/*',
          thumbnailWidth: 300,
        },
        editorOption: {
          placeholder: '',
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
            ]
          }
        },
        valid: true,
        event: '',
        composed: {
          to: '',
          title: '',
          body: '',
          file: ''
        },
        posts: [
          {
            _id: '_dummy_id',
            title: 'آری اینچنین بود ای برادر',
            body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
            image: 'https://realfavicongenerator.net/assets/images/sample/colorful/fb-editor-1.png',
            date: new Date(),
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
            date: new Date(),
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
      // this.insertEmoji('🙂');
    },
    notifications: {
      showError: {
        title: 'خطا',
        message: 'خطایی رخ داد...',
        type: 'error'
      },
      showSubmissionSuccess: {
        title: 'انجام شد',
        message: 'دل‌نوشته شما با موفقیت ثبت شد.',
        type: 'success'
      },
      showDeletionSuccess: {
        title: 'انجام شد',
        message: 'دل‌نوشته شما با موفقیت حذف شد.',
        type: 'success'
      }
    },
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return persianJs(value.toString()).englishNumber().toString();
      }
    },

    methods: {
      clickFile(){
        this.$refs.file.click()
      },
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
      checkFile(file) {
        if (this.composed.file !== '') {
          this.removeFlag = false;
          this.$refs.uploader.removeFile(file);
          this.showError({
            title: 'خطا',
            message: 'شما تنها می توانید یک عکس برای هر پست آپلود کنید.',
            type: 'error'
          });
        }
      },
      removedFile() {
        // programmatically
        if (!this.removeFlag)
          this.removeFlag = true;
        // clicked by user
        else
          this.composed.file = '';
      },
      submitPost(e) {
        e.preventDefault()
        console.log(e)
        console.log(this.composed)
        // let f = e.target
        if (this.$refs.post.validate()) {
          // Finding the recipient
          let recipient = {}
          for (let i = 0; i < this.people.length; i++)
            if (this.people[i].username === this.composed.to)
              recipient = this.people[i]

          let content = {
            title: this.composed.title,
            body: this.composed.body,
            // image: ,
            user: this.$auth.user,
            to: recipient,
            approved: false,
            date: new Date(),
          }

          // Posting - TODO: complete this
          // this.$axios.post('/post/add', {data: content}).then(e => {
          this.posts.push(content)
          this.showSubmissionSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
        }
      },
      removePost(index) {
        if (this.posts[index].user.username === this.$auth.user.username) {
          if (window.confirm("آیا مطمئن هستید؟")) {
            // Deleting - TODO: complete this
            // this.$axios.delete('/posts/' + posts[index]._id).then(e => {
            this.posts.splice(index, 1);
            this.$nuxt.$router.replace({'path': '/content'})
            this.showDeletionSuccess()
            // }).catch(r => {
            //   this.showError()
            // })
          }
        }
      }
    },
    components: {
      Post,
      Dropzone
    }
  }
</script>

<style lang="scss" scoped>
  .editor-container {
    width: 100%;
    /*margin: 0 auto;*/
    padding: 5px 0;

    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }

</style>
