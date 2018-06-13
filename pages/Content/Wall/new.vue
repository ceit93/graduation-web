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
            <post-editor :post="composed" :recipientLocked="false" :people="prettyPeople"></post-editor>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-layout align-center justify-center row wrap class="text-xs-center mx-0">
                <input :v-model="composed.file" @change="imageUploaded" name="image" type="file" ref="file"
                       accept="image/*" style="display: none;">
                <v-flex xs12 md4 class="px-1 my-1">
                  <v-btn @click="clear" large color="warning" type="button" block class="mx-0">
                    <v-icon small>refresh</v-icon>
                    شروع مجدد
                  </v-btn>
                </v-flex>
                <v-flex xs12 md4 class="px-1 my-1">
                  <v-btn @click="clickFile" large type="button" block class="mx-0">
                    <v-icon small>cloud_upload</v-icon>
                    آپلود عکس
                  </v-btn>
                </v-flex>
                <v-flex xs12 md4 class="px-1 my-1">
                  <v-btn color="success" large type="submit" block class="mx-0">
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
  import PostEditor from '~/components/Content/Posts/PostEditor'

  export default {
    name: "index",
    layout: 'content',
    components: {PostEditor},
    data() {
      return {
        image: undefined,
        composed: {
          recipient: '',
          title: '',
          body: '',
          image: ''
        },
        valid: true
      }
    },
    computed: {
      prettyPeople() {
        let res = []
        for (let person of this.people) {
          person.name = this.$persianJS.userName(person)
          person.avatar = this.$helper.avatar(person)
          res.push(person)
        }
        res = this.$helper.sortBy(res, 'std_numbers')
        return res
      }
    },
    asyncData(context) {
      return context.$axios.get('users/students')
        .then(e => {
          return {people: e.data}
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
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
      clear() {
        this.$refs.post.reset()
        this.$refs.file.value = ''
      },
      clickFile() {
        this.$refs.file.click()
      },
      imageUploaded(e) {
        this.image = e.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
          this.composed.image = reader.result
        };
        reader.readAsDataURL(this.image);
      },
      submitPost(e) {
        e.preventDefault();
        if (this.$refs.post.validate()) {
          let image = this.image;
          // recipient Object ID
          let recipient = this.people.filter(x => x._id === this.composed.recipient);
          if (recipient.length !== 1)
            recipient = this.composed.recipient;
          else
            recipient = recipient[0];

          let content = {
            title: this.composed.title,
            body: this.composed.body,
            image: image === undefined ? '' : image,
            user: this.$auth.user,
            approved: false,
          };
          // initiate and fill formData
          let formData = new FormData();
          Object.keys(content).forEach((e) => {
            formData.append(e, content[e]);
          });
          let path = '/posts'
          if (recipient._id !== this.$auth.user._id)// Post to someone else's wall
            path += '/wall/' + recipient._id
          let redirect = recipient.username
          this.submitWithAxios(formData, path, redirect)
        }
      },
      submitWithAxios(data, path, redirect) {
        debugger
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
