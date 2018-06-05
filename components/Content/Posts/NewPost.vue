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
                  <search-select
                    v-model="composed.to"
                    :rules="rules.to"
                    :items="people"
                    :item_text="'name'"
                    :item_value="'objectID'"
                    :item_avatar="'avatar'"
                    :label="'دل‌نوشته برای چه کسی است؟ (در صورتی که برای خود می نویسید نیز اسم خود را انتخاب کنید)'"
                    :placeholder="'گیرنده دل‌نوشته...'"
                    :prepend_icon="'contacts'"
                    :style_class="'input-group--focused'"
                    :required="true"
                    :autocomplete="true"
                    :deletable_chips="true"
                    :chips="true"
                    :cache_items="true"
                    :dense="true"
                    :flat="true"
                  ></search-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="composed.title"
                    :rules="rules.title"
                    label="عنوان دل‌نوشته"
                    append-icon="title"
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
  import SearchSelect from "~/components/Profile/SearchSelect.vue";

  export default {
    name: "posts",
    props: ['people'],
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
    filters: {
      makeParsi: function (value) {
        if (!value) return '';
        return this.$persianJs(value.toString()).englishNumber().toString();
      }
    },
    methods: {
      clickFile() {
        this.$refs.file.click()
      },
      submitPost(e) {
        e.preventDefault();
        if (this.$refs.post.validate()) {
          let image = e.target[3].files[0];
          // recipient Object ID
          let recipient = this.people.filter(x => x.objectID === this.composed.to);
          if (recipient.length !== 1)
            recipient = this.composed.to;
          else
            recipient = recipient[0];

          let content = {
            title: this.composed.title,
            body: this.composed.body,
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
          let path = 'posts/'
          if (recipient.objectID !== this.$auth.user._id)// Post to someone else's wall
            path += 'wall/' + recipient.objectID
          let redirect = recipient.username
          this.submitWithAxios(formData, path, redirect)
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
        })
      }
    },
    components: {SearchSelect, Post},
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
  .ceit-search {
    text-align: right !important;
  }
  .ceit-search-avatar {
    margin-left: 8px !important;
    margin-right: 0px !important;
  }
  .ceit-chip{
    .chip__content{
      padding: 0px 12px 0px 4px !important;
    }
  }
</style>
