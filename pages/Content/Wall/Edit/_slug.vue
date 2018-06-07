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
            <post-editor :post="post" image="" :people="prettyPeople"></post-editor>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-center justify-center row wrap class="text-xs-center">
                <input :v-model="file" name="image" type="file" ref="file" accept="image/*" style="display: none;">
                <v-flex xs12 md4>
                  <v-btn @click="clear" large color="warning" type="button">
                    <v-icon small>refresh</v-icon>
                    شروع مجدد
                  </v-btn>
                </v-flex>
                <v-flex xs12 md4 class="mt-2">
                  <v-btn @click="clickFile" large type="button">
                    <v-icon small>cloud_upload</v-icon>
                    آپلود عکس
                  </v-btn>
                </v-flex>
                <v-flex xs12 md4 class="mt-2">
                  <v-btn color="success" large type="submit">
                    <v-icon small>check</v-icon>
                    ثبت دل‌نوشته
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import PostEditor from '~/components/content/Posts/PostEditor'
  export default {
    name: "index",
    layout: 'content',
    components: {PostEditor},
    data() {
      return {
        valid: true,
        file: ''
      }
    },
    computed: {
      prettyPeople() {
        let res = []
        for (let person of this.people){
          person.name = this.$persianJS.arabicChar(person.name)
          person.avatar = this.$helper.avatar(person)
          res.push(person)
        }
        res = this.$helper.sortBy(res, 'std_numbers')
        return res
      }
    },
    async asyncData(context){
      let post = await context.$axios.get(`posts/${context.params.slug}`)
        .then((res) => {
          return res.data
        }).catch(e => {
          context.error({ statusCode: 404, message: 'دل‌نوشته مورد نظر یافت می‌نشود...' })
        })
      let people = await context.$axios.get('users/students')
        .then(e => {
          return e.data
        }).catch(e => {
          context.error({ statusCode: 500, message: 'خطای سرور...' })
        })
      return {
        post: post,
        people: people
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
    methods: {
      clear(){
        this.$refs.post.reset()
        this.$refs.file.value = ''
      },
      clickFile() {
        this.$refs.file.click()
      },
      submitPost(e) {
        e.preventDefault();
        if (this.$refs.post.validate()) {
          let image = e.target[3].files[0]
          // recipient Object ID
          let recipient = this.people.filter(x => x._id === this.post.user);
          if (recipient.length !== 1)
            recipient = this.post.user;
          else
            recipient = recipient[0];

          let content = {
            title: this.post.title,
            body: this.post.body,
            image: image === undefined ? '' : image,
            user: this.$auth.user,
            approved: false,
            date: new Date(),
          };
          // initiate and fill formData
          let formData = new FormData();
          Object.keys(content).forEach((e) => {
            formData.append(e, content[e]);
          });
          let path = 'posts/' + this.post._id
          let redirect = recipient.username
          this.submitWithAxios({data: formData}, path, redirect)
        }
      },
      submitWithAxios(data, path, redirect) {
        this.$axios.post(path, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(e => {
          this.showSubmissionSuccess()
          this.$nuxt.$router.replace({'path': redirect})
        }).catch(r => {
          this.showError()
          console.log(r)
        })
      }
    },
  }
</script>

<style scoped>
</style>
