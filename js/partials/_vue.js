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
    phase: 'begin',
    message: 'Help Sisyphus push the rock uphill.',
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
    },

    store: [
      { 
        id: 1, name: "Fresh Kicks", price: 100,
        desc: "Better arch support means that you'll get 1.6% better pushes.",
      },
      { 
        id: 2, name: "Small pickaxe", price: 300,
        desc: "It's not the sharpest, but it's enough to carve out a little bit of the rock to make it slightly smaller.",
      }
    ],
    inventory: []

  },

  methods: {

    sisyphusClick() {
      let self = this;
      let m = 6;

      if (self.s.retreating == false) {

        if (self.phase != 'begin' && self.phase != 'pushing') {
          self.switchMessage('pushing');
        }

        self.s.bottom += m;
        self.s.left += m;

        self.r.bottom += m;
        self.r.left += m;
        
        if (self.r.left > 70) {
          self.r.bottom = 2;
          self.r.left = 0;
          self.r.falling = true;
          self.s.retreating = true;
          self.switchMessage('falling');
        }

      } else if (self.s.retreating == true) {
        self.s.bottom -= (m * 1.6);
        self.s.left -= (m * 1.6);
        if (self.phase != 'retreat') {
          self.switchMessage('retreat');
        }
        if (self.s.bottom < 0 || self.s.left < 0) {
          self.s.retreating = false;
          self.s.bottom = 0;
          self.s.left = 0;
          self.r.falling = false;
        }
      } 
    },

    buyItem(i,id) {
      let self = this;
      let n = self.store[i];
      self.inventory.push(n);
      self.store.splice(i,1);
    },

    switchMessage(m) {
      let self = this;
      self.phase = m;
      if (m == 'falling') {
        self.message = "Uh oh!";
      } else if (m == "retreat") {
        self.message = "Go back and get it.";
      } else if (m == "pushing") {
        self.message = "Keep going.";
      }
    }

  },

  computed: {
    rockLeft() {
      return 'calc('+this.s.width+'% + '+this.r.left+'%)';
    },

  }

});
