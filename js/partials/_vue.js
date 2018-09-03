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
    score: 0,
    totalScore: 0,
    s: sDefaults,
    r: rDefaults,
    store: storeItems,
    inventory: []
  },

  methods: {

    sisyphusClick() {
      let self = this;
      let f = self.s.pushForce;
      let r = self.s.retreatSpeed;

      if (self.s.retreating == false) {

        if (self.phase != 'begin' && self.phase != 'pushing') {
          self.switchMessage('pushing');
        }
        self.score++;
        self.totalScore++;
        self.s.bottom += f;
        self.s.left += f;

        self.r.bottom += f;
        self.r.left += f;
        
        if (self.r.left > 70) {
          self.r.bottom = begin.r.bottom;
          self.r.left = begin.r.left;
          self.r.falling = true;
          self.s.retreating = true;
          self.switchMessage('falling');
        }

      } else if (self.s.retreating == true) {
        self.s.bottom -= r;
        self.s.left -= r;
        if (self.phase != 'retreat') {
          self.switchMessage('retreat');
        }
        if (self.s.bottom <= begin.s.bottom || self.s.left <= begin.s.left) {
          self.s.retreating = false;
          self.s.bottom = begin.s.bottom;
          self.s.left = begin.s.left;
          self.r.falling = false;
        }
      } 
    },

    buyItem(i,item) {
      let self = this;
      
      if (self.score >= item.price) {
        self.score -= item.price;
        let n = self.store[i];
        self.inventory.push(n);
        self.store.splice(i,1);
        self.buyItemEffect(item.id);
      }
      
    },

    buyItemEffect(id) {
      let self = this;
      if (id == 1) { // Fresh Kicks
        self.s.pushForce = (self.s.pushForce * 1.01);
        self.s.retreatSpeed = (self.s.pushForce * 1.7);
      } else if (id == 2) { // small pickaxe
        self.r.height = (self.r.height * 0.85);
        self.r.width = (self.r.width * 0.85);
        self.s.pushForce = (self.s.pushForce * 1.5);
      } else if (id == 3) { // gum
        self.r.height = (self.r.height * 1.15);
        self.r.width = (self.r.width * 1.15);
        self.s.pushForce = (self.s.pushForce * 0.5);
      } else if (id == 3) { // analgesic
        self.s.pushForce = (self.s.pushForce * 2);
      }
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
    rockHeight() {
      return this.r.height+'%';
    },
    rockWidth() {
      return this.r.width+'%';
    },
    rockMarginLeft() {
      return this.r.marginLeft+'%';
    }

  }

});
