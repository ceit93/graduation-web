module.exports = {
  /*
  ** Headers of the page
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    },
    options: {
      redirect: {
        login: '/landing',
        logout: '/login',
        callback: '/',
        user: '/'
      }
    }
  },
  router: {
    middleware: ['auth']
  },

  axios: {
    port: '3000',
    prefix: '/api/',
    https: true,
    proxyHeaders: false,
    proxy: true, // Can be also an object with default options
    debug: true
  },

  proxy: {
    '/api': process.env.PROXY_API_URL || 'http://localhost:3000/',
  },
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/tabs.js',
    '~plugins/jalali-date.js',
    {src: '~plugins/vue-notification.js', ssr: false}
  ],
  head: {
    title: 'آیین فارغ‌التحصیلی ۱۳۹۳',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'msapplication-TileColor', content: '#ffffff'},
      {name: 'theme-color', content: '#ffffff'},
      {hid: 'description', name: 'description', content: 'Graduation Website'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes:'180x180'},
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes:'32x32'},
      {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes:'16x16'},
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
      {rel: 'manifest', href: '/manifest.json'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'},
    ]
  },
  css: [
    '@/assets/css/main.scss',
    '@/node_modules/vuetify/dist/vuetify.min.css',
    '@/assets/css/iransharp.css',
    '@/assets/css/bootstrap-grid.min.css',
    '@/node_modules/@mdi/font/css/materialdesignicons.min.css',
    '@/node_modules/vue-tabs-component/docs/resources/tabs-component.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#30fff2'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
