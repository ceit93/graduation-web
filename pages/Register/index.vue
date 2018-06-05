<template>
  <v-container>
    <v-layout class="mx-2">
      <v-flex md5 xs12 class="mt-4 mx-auto">
        <v-card>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-layout row class="align-items-center justify-content-center">
                <v-flex xs10
                        v-for="(item,index) in fields"
                        :key="index"
                        class="mx-2">
                  <v-text-field
                    v-if="item.type === 'text-field'"
                    :label="item.label"
                    :rules="item.rules"
                    v-model="item.value"
                    required/>
                  <v-text-field
                    v-if="item.type === 'number'"
                    :label="item.label"
                    v-model="item.value"
                    min="0"
                    type="number"/>


                </v-flex>
                <span class="title blue g-w-100 white--text pa-3 text-xs-center elevation-3">
                  <span>
                    هزینه ثبت نام:
                  </span>
                  <span style="font-size: 30px">
                   {{this.$persianJS.englishNumber(this.cost)}}
                  </span>

                  <span style="font-size: 9px;">
                    هزار تومان
                  </span>

                </span>

              </v-layout>

              <v-layout row class="align-items-center justify-content-center mt-3">

                <v-btn class="success" @click="submit">ثبت نام</v-btn>
              </v-layout>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        valid:true,
        fields: [
          {
            label: 'ایمیل',
            value: '',
            type: 'text-field',
            rules: [
              v => !!v || 'لطفا ایمیل خود را وارد کنید.',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'آدرس ایمیل باید معتبر باشد.'
            ],
          },
          {
            label: 'شماره تلفن',
            value: '',
            type: 'text-field',
            rules: [
              v => !!v || 'لطفا شماره تلفن خود را وارد کنید.',
              // TODO: regex for phone number
              // v => v.length <= 10 || 'Name must be less than 10 characters'
            ]
          },
          {
            label: 'تعداد افراد همراه',
            value: 0,
            type: 'number'
          },
        ]
      }
    },
    middleware: 'redirect-to-profile', // TODO remove this line
    methods:{
      submit(){
        if (this.$refs.form.validate()) {
          // TODO: connect to payment gate
        }
      }
    },
    computed: {
      /**
       * Computes total cost for student and his/her family
       * @param val
       * @returns {number}
       */
      cost: function (val) {
        return 30 + (this.fields[2].value * 30);
      }
    },
  }
</script>

<style scoped>
</style>
