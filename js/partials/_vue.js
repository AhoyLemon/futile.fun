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
        self.s.bottom += f;
        self.s.left += f;

        self.r.bottom += f;
        self.r.left += f;
        
        if (self.r.left > 70) {
          self.r.bottom = 2;
          self.r.left = 0;
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
        if (self.s.bottom < 0 || self.s.left < 0) {
          self.s.retreating = false;
          self.s.bottom = 0;
          self.s.left = 0;
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
        self.s.pushForce = (self.s.pushForce * 3);
      } else if (id == 2) {
        self.r.height = (self.r.height * 0.85);
        self.r.width = (self.r.width * 0.85);
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
    }

  }

});
