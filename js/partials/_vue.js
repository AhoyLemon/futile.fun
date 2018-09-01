Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus();
  }
});

var app = new Vue({
  el: '#app',
  data: {
    
  },
  methods: {

    sisyphusClick() {
      let self = this;
      alert('you clicked');
    }
  }

});