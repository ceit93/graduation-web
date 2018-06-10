<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid" lazy-validation ref="post" @submit="submitPost">
        <v-card>
          <v-card-title class="justify-content-center">
            <h3 class="title">ویرایش دل‌نوشته</h3> &nbsp;
          </v-card-title>
          <v-card-text>
            <post-editor :post="post" :people="prettyPeople" :recipientLocked="true" :loading="loading"></post-editor>
          </v-card-text>
          <v-card-actions>
            <v-container class="justify-content-between">
              <v-layout align-center row wrap class="text-xs-center mx-0 ">
                <input :v-model="file" @change="imageUpdate" name="image" type="file" ref="file" accept="image/*"
                       style="display: none;">
                <v-flex xs12
                        :class="[btnColumn,'my-1','px-1']"
                >
                  <v-btn @click="clear" large color="warning" type="button" block class="mx-1">
                    <v-icon small>refresh</v-icon>
                    شروع مجدد
                  </v-btn>
                </v-flex>
                <v-flex xs12
                        :class="[btnColumn,'my-1' ,'px-1']"
                        v-if="this.$helper.isValid(post.image)">
                  <v-btn @click="removeImage"
                         :disabled="!this.$helper.isValid(post.image)"
                         large
                         color="error"
                         block
                         class="mx-1"
                         type="button">
                    <v-icon small>delete</v-icon>
                    حذف عکس
                  </v-btn>
                </v-flex>
                <v-flex xs12
                        :class="[btnColumn,'my-1','px-1']"
                        >
                  <v-btn @click="clickFile"
                         :disabled="this.$helper.isValid(post.image)"
                         large
                         type="button"
                         block
                         class="mx-1">
                    <v-icon small>cloud_upload</v-icon>
                    آپلود عکس
                  </v-btn>
                </v-flex>
                <v-flex xs12
                        :class="[btnColumn,'my-1','px-1']"
                        :disabled="loading"
                        :md3="this.$helper.isValid(post.image)"
                        >
                  <v-btn color="success"
                         large
                         type="submit"
                         block
                         class="mx-1">
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
        valid: true,
        file: '',
        loading: true,
        fileChange: false
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
      },
      btnColumn() {
        return this.$helper.isValid(this.post.image) ? 'md3' : 'md4';
      },
    },
    async asyncData(context) {
      let post = await context.$axios.get(`posts/${context.params.slug}`)
        .then((res) => {
          return res.data
        }).catch(e => {
          context.error({statusCode: 404, message: 'دل‌نوشته مورد نظر یافت می‌نشود...'})
        })
      let owner = await context.$axios.get(`/posts/owner/${context.params.slug}`)
        .then(e => {
          return e.data
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
          console.log(e)
        })
      post.recipient = owner._id
      let people = await context.$axios.get('users/students')
        .then(e => {
          return e.data
        }).catch(e => {
          context.error({statusCode: 500, message: 'خطای سرور...'})
        })
      return {
        post: post,
        people: people,
        owner: owner
      }
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
        this.post.title = ''
        this.post.body = ''
        this.$refs.file.value = ''
        this.post.image = undefined
      },
      clickFile() {
        this.$refs.file.click()
      },
      removeImage() {
        this.post.image = undefined;
        this.image = '';
      },

      /**
       * Store uploaded image into this.image
       * and load image as data url into post-editor img tag
       * @param e
       */
      uploadImage(e) {
        this.image = e.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
          this.post.image = reader.result
        };
        reader.readAsDataURL(this.image);
      },
      submitPost(e) {
        e.preventDefault();
        if (this.$refs.post.validate()) {
          let image = this.image;
          if (!this.$helper.isValid(this.post.image)) {
            this.post.image = image
          }
          let content = {
            title: this.post.title,
            body: this.post.body,
            image: this.fileChange ? image : (this.$helper.isValid(this.post.image) ? this.post.image : ''),
            approved: false,
          };
          // initiate and fill formData
          let formData = new FormData();
          Object.keys(content).forEach((e) => {
            formData.append(e, content[e]);
          });
          let path = '/posts/' + this.post._id
          let redirect = this.owner.username
          this.submitWithAxios(content, path, redirect)
        }
      },
      submitWithAxios(data, path, redirect) {
        this.$axios.post(path, {data: data}).then(e => {
          this.showSubmissionSuccess();
          this.$nuxt.$router.replace({'path': '/content/wall/' + redirect})
        }).catch(r => {
          this.showError();
          console.log(r)
        })
      },
    },
  }
</script>

<style scoped>
</style>
