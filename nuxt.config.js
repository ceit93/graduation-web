module.exports = {
  /*
  ** Headers of the page
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
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
        login: '/profile',
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
    title: 'آیین فارغ‌التحصیلی دانشجویان ورودی ۱۳۹۳',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'msapplication-TileColor', content: '#ffffff'},
      {name: 'theme-color', content: '#ffffff'},
      {hid: 'description', name: 'description', content: 'وب‌اپلیکیشن فارغ‌التحصیلی دانشجویان ورودی سال ۱۳۹۳ دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر'},
      {property: 'og:locale', content: 'fa_IR'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes:'32x32'},
      {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes:'16x16'},
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
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
  },

  /*
   * PWA Module
   */
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: 'default',
    name: 'آیین فارغ‌التحصیلی دانشجویان ورودی ۱۳۹۳',
    author: 'AUT CEIT Students - Class of 2018',
    description: 'وب‌اپلیکیشن فارغ‌التحصیلی دانشجویان ورودی سال ۱۳۹۳ دانشکده مهندسی کامپیوتر و فناوری اطلاعات دانشگاه صنعتی امیرکبیر',
    theme_color: '#01579B',
    lang: 'fa',
    ogHost: 'https://ceit93.ir',
    nativeUI: true
  },
  manifest: {
    name: "فارغ‌التحصیلی ورودی ۱۳۹۳",
    short_name: "CEIT 93",
    theme_color: "#01579B",
    background_color: "#ffffff",
  }
}
