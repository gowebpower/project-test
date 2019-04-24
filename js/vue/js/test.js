var app = new Vue({
  el: '#app',
  data: {
    message: 'dd',
    messageVisibility: true,

    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar',
    isActive: true,
    hasError: true
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  },

  beforeCreate: function() {


  },

  created: function() {

  },
  
  methods: {
      
    method1: function(){
      
      this.message = 'aaaa';

    }

  }

})



// var app2 = new Vue({
//   el: '#app2',
//   data: {
//     message: 'You loaded this page on ' + new Date().toLocaleString()
//   }
// })