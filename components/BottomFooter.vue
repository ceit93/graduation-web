<template>
    <v-footer height="auto" :fixed="false">
        <v-card
                flat
                tile
                class="lighten-1 white--text text-xs-center" width="100%"
        >
            <v-card-text class="grey darken-4">
                <v-btn
                        v-for="icon in icons"
                        :key="icon.ico"
                        icon
                        class="mx-3 white-text"
                        :href="icon.link"
                        :target="'_blank'"
                        rel="noopener"
                >
                    <v-icon size="24px">{{ icon.ico }}</v-icon>
                </v-btn>
                <v-flex xs12 text-xs-center white--text v-html="footer">
                </v-flex>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
  export default {
    name: 'BottomFooter',
    data: () => ({
      icons: [
        {ico: 'fa fa-facebook', link: 'https://facebook.com/aylandance'},
        {ico: 'fa fa-youtube', link: 'https://youtube.com/aylandance'},
        {ico: 'fa fa-instagram', link: 'https://instagram.com/aylandance'},
        {ico: 'fa fa-paper-plane', link: 'https://t.me/aylandance'}
      ],
      footer: 'دانشجویان ورودی ۹۳ دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر'
    }),
  }
</script>

<style scoped>

</style>
