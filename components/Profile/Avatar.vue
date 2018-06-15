<template>
    <div>
      <v-avatar
        :tile="false"
        :size="150"
        color="grey lighten-4"
      >
        <img
          v-show="!loading"
          :src="this.$helper.avatar(this.$auth.user)"
          :alt="this.$persianJS.userName(this.$auth.user)">
        <v-progress-circular
          v-show="loading"
          indeterminate
          color="primary"/>
      </v-avatar>
      <br>
      <input
        :v-model="avatar"
        name="image"
        type="file"
        ref="avatar"
        accept="image/*"
        style="display: none;"
        @change="uploadAvatar">
      <v-btn
        color="info"
        @click="changeAvatar"
        small>
        تغییر عکس
      </v-btn>
    </div>
</template>

<script>
    export default {
      name: "Avatar",
      data() {
        return {
          avatar: '',
          loading: false,
        }
      },
      methods: {
        changeAvatar() {
          this.$refs.avatar.click();
        },
        uploadAvatar(e) {
          this.loading = true;
          this.avatar = e.target.files[0];
          let formData = new FormData();
          formData.append('user', this.$auth.user);
          formData.append('avatar', this.avatar);
          this.$axios.post('/profie', formData, {
            header: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(async(res) => {
            await this.$auth.fetchUser();
            this.loading = false;
            this.showUploadSuccess()
          }).catch(e => {
            this.showUploadFailure()
            console.log(e)
          });

        }
      },
      notifications: {
        showUploadSuccess: {
          title: 'چه عکسی!',
          message: 'آپلود عکس با موفقیت انجام شد.',
          type: 'success'
        },
        showUploadFailure: {
          title: 'خطا',
          message: 'خطایی رخ داد...',
          type: 'error'
        }
      }
    }
</script>

<style scoped>

</style>
