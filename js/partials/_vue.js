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
    fg: {
      transform:0
    },
    bg: {
      transform:0
    },
    store: storeItems,
    inventory: []
  },

  methods: {

    sisyphusClick() {
      let self = this;
      let f = self.s.pushForce;
      let r = self.s.retreatSpeed;
      let fT = (self.s.pushForce * 0.6);
      let bT = (self.s.pushForce * 0.65);

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


        //forground transform
        self.fg.transform -= fT;
        self.bg.transform -= bT;
        
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

        //forground transform
        self.fg.transform += fT;
        self.bg.transform += bT;


        if (self.phase != 'retreat') {
          self.switchMessage('retreat');
        }
        if (self.s.bottom <= begin.s.bottom || self.s.left <= begin.s.left) {
          self.s.retreating = false;
          self.s.bottom = begin.s.bottom;
          self.s.left = begin.s.left;
          self.r.falling = false;
          self.fg.transform = 0;
          self.bg.transform = 0;
        }
      } 
    },

    buyItem(i,item) {
      let self = this;
      
      if (self.score >= item.price) {
        self.score -= item.price;
        let n = self.store[i];
        n.showDesc = false;
        self.inventory.push(n);
        self.store.splice(i,1);
        self.buyItemEffect(item.id);
      }
      
    },

    foo(item) {
      item.showDesc = !item.showDesc;
    },

    buyItemEffect(id) {
      let self = this;
      if (id == 1) { // Fresh Kicks
        self.s.pushForce = (self.s.pushForce * 1.01);
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.3);
      } else if (id == 2) { // small pickaxe
        self.r.height = (self.r.height * 0.85);
        self.r.width = (self.r.width * 0.85);
        self.s.pushForce = (self.s.pushForce * 1.5);
      } else if (id == 3) { // gum
        self.r.height = (self.r.height * 1.15);
        self.r.width = (self.r.width * 1.15);
        self.s.pushForce = (self.s.pushForce * 0.5);
      } else if (id == 4) { // analgesic
        self.s.pushForce = (self.s.pushForce * 2);
      } else if (id == 5) { // peach tea
        // does nothing
      } else if (id == 6) { // turkey sandwich
        self.s.pushForce = (self.s.pushForce * 3);
      } else if (id == 7) { // turkey sandwich
        self.s.pushForce = 50;
      } else if (id == 8) { // rancid taco
        self.s.pushForce = -1.2;
      }
      
    },

    switchMessage(m) {
      let self = this;
      self.phase = m;
      if (m == 'falling') {
        self.message = randomFrom(rockFellMessages);
      } else if (m == "retreat") {
        self.message = randomFrom(retreatMessages);
      } else if (m == "pushing") {
        self.message = randomFrom(keepPushingMessages);
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
    },
    foregroundTransform() {
      return 'translateX('+this.fg.transform+'%)';
    },
    backgroundTransform() {
      return 'translateX('+this.bg.transform+'%)';
    }



  }

});
