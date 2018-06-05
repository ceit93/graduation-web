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
      prettyPeople: function(people){
        let res = []
        for (let person of people){
          person.name = this.$persianJS.arabicChar(person.name) + ' - ' + this.$persianJS.englishNumber(person.std_numbers)
          res.push(person)
        }
        res = this.sortBy(res, 'std_numbers')
        return res
      },
      sortBy: function(array, sortBy) {
        return array.sort((a,b) => {
          return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0)
        })
      }
    };
  }
};
