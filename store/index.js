export default {
  actions: {
    async redirectToLogin() {
      let info = await this.$axios.$get('/oauth/aut/login')
      window.location = info.redirect_uri
    },
    async login(code) {
      if (code) {
        await this.$auth.login({ code })
      }
    }
  }
}
