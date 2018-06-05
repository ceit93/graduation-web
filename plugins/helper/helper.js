export default {
  install(Vue,options){
    Vue.prototype.$helper = {
      avatar: function(object) {
        if (object)
          if (object.avatar)
            if (object.avatar !== '' && object.avatar !== 'undefined')
              return object.avatar
        return '/avatar.png'
      },

      sortBy: function(array, sortBy, order) {

      }
    };
  }
};
