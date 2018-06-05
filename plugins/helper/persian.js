import persianJS from '~/node_modules/persianjs'
export default {
  install(Vue,options){
    Vue.prototype.$persianJS = {
      arabicChar: function(str) {
        return persianJs(str.toString()).arabicChar().toString()
      },
      persianNumber: function (str) {
        return persianJs(str.toString()).persianNumber().toString()
      },
      arabicNumber: function(str) {
        return persianJs(str.toString()).arabicNumber().toString()
      },
      englishNumber: function(str) {
        return persianJs(str.toString()).englishNumber().toString()
      },
      toEnglishNumber: function(str) {
        return persianJs(str.toString()).toEnglishNumber().toString()
      },
      fixURL: function(str) {
        return persianJs(str.toString()).fixURL().toString()
      },
      decodeURL: function(str) {
        return persianJs(str.toString()).decodeURL().toString()
      },
      switchKey: function(str) {
        return persianJs(str.toString()).switchKey().toString()
      },
      digitsToWords: function(str) {
        return persianJs(str.toString()).digitsToWords().toString()
      },
      halfSpace: function(str){
        return persianJs(str.toString()).halfSpace().toString()
      }
    };
  }
};