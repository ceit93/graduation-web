<template>
  <v-card>
    <v-card-title class="justify-content-center">
      <h3 class="title">دل‌نوشته‌های ثبت‌شده برای شما</h3>
      <span class="caption grey--text text--darken-1">*فقط دل‌نوشته‌های تایید شده در نشریه منتشر می‌شوند می‌توانید از منوی سمت چپ هر دل‌نوشته نسبت به تایید یا عدم تایید آن اقدام بکنید. تایید شدن یا عدم تایید دل‌نوشته‌ها توسط نویسنده آن دل‌نوشته قابل مشاهده نیست.</span>
    </v-card-title>
    <v-card-text>
      <div v-for="(post,index) in posts"
           :key="index">
        <post :postData="post" @approved="approvePost(index)" @disapproved="disapprovePost(index)"/>

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
    import Post from '~/components/Content/Post.vue'
    export default {
      components: {Post},
      name: "wall",
      data() {
        return {
          posts: [
            {
              _id: '_dummy_id',
              title: 'آری اینچنین بود ای برادر',
              body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
              date: new Date(),
              approved: true,
              user: {
                id: '_dummydata',
                username: '9331001',
                name: 'ایمان تبریزیان'
              },
              to: {
                id: '_dummydata',
                username: '9331009',
                name: 'امیر حقیقتی ملکی'
              }
            },
            {
              _id: '_dummy_id',
              title: 'آری اینچنین بود ای برادر',
              body: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
              date: new Date(),
              approved: false,
              user: {
                id: '_dummydata',
                username: '9331002',
                name: 'خیار خیاری'
              },
              to: {
                id: '_dummydata',
                username: '9331009',
                name: 'امیر حقیقتی ملکی'
              }
            },
          ]
        }
      },
      notifications: {
        showError: {
          title: 'خطا',
          message: 'خطایی رخ داد...',
          type: 'error'
        },
        showApprovingSuccess: {
          title: 'انجام شد',
          message: 'دل‌نوشته روی دیوار شما نمایش داده می‌شود.',
          type: 'success'
        },
        showDisapprovingSuccess: {
          title: 'انجام شد',
          message: 'دل‌نوشته روی دیوار شما نمایش داده نمی‌شود.',
          type: 'success'
        }
      },
      methods: {
        approvePost(index){
          this.posts[index].approved = true
          // Posting - TODO: complete this
          // this.$axios.post('/posts/' + this.posts[index]._id, {data: this.posts[index]}).then(e => {
          this.showApprovingSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
        },
        disapprovePost(index){
          this.posts[index].approved = false
          // Posting - TODO: complete this
          // this.$axios.post('/posts/' + this.posts[index]._id, {data: this.posts[index]}).then(e => {
          this.showDisapprovingSuccess()
          // }).catch(r => {
          //   this.showError()
          // })
        }
      }
    }
</script>

<style scoped>

</style>
