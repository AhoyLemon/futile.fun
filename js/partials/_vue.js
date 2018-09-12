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
    message: 'Click Sisyphus to push the rock uphill.',
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
      let bT;

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


        //background transform
        bT = (self.s.pushForce * 0.75);
        self.bg.transform -= bT;
        
        //alert(self.r.peak);
        if (self.r.left >= self.r.peak) {
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
        bT = (self.s.retreatSpeed * 0.75);
        self.bg.transform += bT;


        if (self.phase != 'retreat') {
          self.switchMessage('retreat');
          self.r.peak = randomNumber(55,75);
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
        self.s.pushForce = (self.s.pushForce * 1.35);
      } else if (id == 5) { // peach tea
        // does nothing
      } else if (id == 6) { // heelies
        self.s.pushForce = (self.s.pushForce * 0.85);
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.4);
      } else if (id == 7) { // turkey sandwich
        
      } else if (id == 8) { // rancid taco
        
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
    },


    availableUpgrades() {
      let self = this;
      let a = [];
      self.store.forEach(function(item,i) {
        if (self.totalScore > (item.price * 0.9)) {
          a.push(item);
        }
      });
      return a;
    }



  },

  mounted: function() {
    new PNotify({
      title: 'Regular Notice',
      text: 'Check me out! I\'m a notice.',
      hide: false
    });

    new PNotify({
      //title: 'Achievement Unlocked!',
      text: "<b>25 G</b> You wasted your time.",
      hide: false
    });

    new PNotify({
      title: 'Achievement Unlocked!',
      text: "Maecenas ornare interdum eros, sit amet placerat orci auctor quis. Pellentesque iaculis diam dolor, vel porta nisi fermentum vitae. Phasellus iaculis dui arcu, in molestie mi porta sed.",
      hide: false
    });
    
  }

});
