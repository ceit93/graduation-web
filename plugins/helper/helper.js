export default {
  install(Vue,options){
    Vue.prototype.$helper = {
      getAavatr: function(avatar) {
        if (avatar)
          if (avatar !== '' && avatar !== 'undefined')
            return avatar
        return '/avatar.png'
      }
    };
  }
};
