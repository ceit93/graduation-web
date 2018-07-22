export default {
  install(Vue,options){
    Vue.prototype.$helper = {
      avatar: function(object) {
        if (object) {
          if (object.grad_photo) {
            return object.grad_photo
          }
          if (object.avatar) {
            if (object.avatar !== '' || object.avatar !== 'undefined')
              return object.avatar
            return '/' + object.gender + '-avatar.png'
          }
          return '/' + object.gender + '-avatar.png'
        }
        return '/undefined-avatar.png'
      },
      sortBy: function(array, sortBy) {
        return array.sort((a,b) => {
          return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0)
        })
      },
      isValid: function(key) {
        if (key !== undefined && key !== null)
          return key !== ''
        return false
      }
    };
  }
};
