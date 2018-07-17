<template>

  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100%">
    <div
      v-if="status === 'ok'"
      class="text-xs-center">
      <!--پرداخت شما با موفقیت انجام شد-->
      <v-flex xs12 md4 class="mx-auto">
        <ticket title="هم ورودی عزیز به تعداد مهمان های شما افزوده شد." :data="ticket"/>
      </v-flex>
    </div>

    <div
      v-else-if="status === 'nok'"
      class="text-xs-center"
    >
      <div style="font-size: 4rem">😭</div>
      <h2 class="red white--text">
        مشکلی در روند ثبت نام شما پیش آمد.
      </h2>
      <br>
      <div>
        <v-btn nuxt to="/register" color="info" outline style="flex: none!important;">
          ثبت نام جشن
          <v-icon small>chevron_left</v-icon>
        </v-btn>
      </div>

    </div>
  </div>
</template>

<script>
  import Ticket from '@/components/Ticket.vue'
  export default {
    components:{
      Ticket
    },
    name: "added",
    async asyncData(context) {
      let params = context.query;
      try {
        if (params.Authority && params.Status) {
          let result = await context.$axios.get(`/payment/check/add?Authority=${params.Authority}&Status=${params.Status}`);
          return {status: 'ok', ticket: result.data}
        } else {
          context.redirect('/register')
        }
      } catch (e) {
        return {status: 'nok', message: e.response.data.message}
      }

    }
  }

</script>

<style scoped>

</style>
