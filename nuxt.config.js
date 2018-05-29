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
        },
        tokenRequired: true
      }
    },
    options: {
      redirect: {
        login: '/profile',
        logout: '/login',
        callback: '/login',
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
    '/api': 'http://localhost:3000/',
  },
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/tabs.js',
    '~plugins/jalali-date.js',
    {src: '~plugins/vue-notification.js', ssr: false}
  ],
  head: {
    title: 'graduation-web',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Graduation Website'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
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
