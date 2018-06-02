<template>
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
                    :rules="rules.to"
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
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="composed.title"
                    :rules="rules.title"
                    label="عنوان دل‌نوشته"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="composed.body"
                    :rules="rules.body"
                    box
                    required
                    multi-line
                    label="متن دل‌نوشته"
                    placeholder="یادش بخیر اون زمونا..."/>
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
      <!--<v-divider/>-->
      <!--<v-card>-->
        <!--<v-card-title class="justify-content-center">-->
          <!--<h3 class="title">دل‌نوشته‌های ثبت‌شده توسط من</h3>-->
        <!--</v-card-title>-->
        <!--<v-card-text>-->
          <!--<div v-for="(post,index) in posts" :key="index">-->
            <!--<post :postData="post" v-on:removeMe="removePost(index)"/>-->
          <!--</div>-->
        <!--</v-card-text>-->
      <!--</v-card>-->
    </v-card-text>
  </v-card>
</template>

<script>
  import Post from '~/components/Content/Posts/Post.vue'
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
        rules: {
          to: [v => !!v || 'مشخص کنید این دلنوشته برای کیست'],
          title: [v => !!v || 'وارد کردن عنوان الزامی است'],
          body: [v => !!v || 'وارد کردن متن الزامی است'],
          file: ''
        },
        composed: {
          to: '',
          title: '',
          body: '',
          file: ''
        },
        people: []
      }
    },
    mounted() {
      this.fetchPeople()
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
      }
    },
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return persianJs(value.toString()).englishNumber().toString();
      }
    },
    methods: {
      clickFile() {
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
      submitPost(e) {
        e.preventDefault();
        let image = e.target[3].files[0];
        if (image) {
          let reader = new FileReader();
          reader.readAsDataURL(image);
          // TODO : we dont need fileReader when we post the form into server
          reader.onload = (e) => {
            let imageURL = e.target.result;
            this.validateForm(imageURL);
          };
        } else {
          this.validateForm(null);
        }
      },
      validateForm(imgURL) {
        if (this.$refs.post.validate()) {
          // Finding the recipient
          let recipient = {}
          for (let i = 0; i < this.people.length; i++)
            if (this.people[i].username === this.composed.to)
              recipient = this.people[i]
          let content = {
            title: this.composed.title,
            body: this.composed.body,
            image: imgURL,
            user: this.$auth.user,
            to: recipient,
            approved: false,
            date: new Date(),
          };
          // Posting - TODO: complete this
          // this.$axios.post('/post/add', {data: content}).then(e => {
          this.showSubmissionSuccess()
          this.$nuxt.$router.replace({'path' : '/content/wall'})
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
            this.$nuxt.$router.replace({'path': '/content/wall/'})
            this.showDeletionSuccess()
            // }).catch(r => {
            //   this.showError()
            // })
          }
        }
      }
    },
    components: {Post}
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
