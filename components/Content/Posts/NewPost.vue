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
                    item-value="objectID"
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

    </v-card-text>
  </v-card>
</template>

<script>
  import Post from '~/components/Content/Posts/Post.vue'
  export default {
    name: "posts",
    data() {
      return {
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
    asyncData(context) {
      return context.$axios.get(`users/students`)
        .then((res) => {
          console.log("USERS are:")
          console.log(res.data)
          return { people: res.data.users }
        }).catch(e => {
          console.log('error')
          console.log({name: 'خل و چل'})
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
        let ff = await context.$axios.get(`users/students`)
          .then((res) => {
            console.log("USERS are:")
            console.log(res.data)
            return { people: res.data.users }
          }).catch(e => {
            console.log('error')
            console.log({name: 'خل و چل'})
          })
        console.log(ff)
        this.people = ff
      },
      submitPost(e) {
        e.preventDefault()
        let recipient = composed.to
        let content = {
          title: this.composed.title,
          body: this.composed.body,
          // image: imgURL, TODO
          user: this.$auth.user,
          approved: false,
          date: new Date(),
        };
        console.log(content)
        if (recipient === this.$auth.user.id){
          this.$axios.post('/posts', {data: content}).then(e => {
            this.showSubmissionSuccess()
            this.$nuxt.$router.replace({'path' : '/content/wall'})
          }).catch(r => {
            this.showError()
          })
        } else {

        }
      },
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
