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
    s: {
      bottom: 0,
      left:0,
      width: 3,
      height:8,
      retreating: false
    },
    r: {
      bottom: 2,
      left:0
    }
  },

  methods: {

    sisyphusClick() {
      let self = this;

      let m = 6;

      if (self.s.retreating == false) {
        self.s.bottom += m;
        self.s.left += m;

        self.r.bottom += m;
        self.r.left += m;
        
        if (self.r.left > 70) {
          self.r.bottom = 2;
          self.r.left = 0;
          self.r.falling = true;
          self.s.retreating = true;
        }

      } else if (self.s.retreating == true) {
        self.s.bottom -= (m * 1.6);
        self.s.left -= (m * 1.6);

        if (self.s.bottom < 0 || self.s.left < 0) {
          self.s.retreating = false;
          self.s.bottom = 0;
          self.s.left = 0;
          self.r.falling = false;
        }


      }
      
    }
  },

  computed: {
    rockLeft() {
      return 'calc('+this.s.width+'% + '+this.r.left+'%)';
    }
  }

});
