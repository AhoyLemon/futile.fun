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
    secondsPlayed: 0,
    s: sDefaults,
    r: rDefaults,
    fg: {
      transform:0
    },
    bg: {
      transform:0
    },
    store: storeItems,
    inventory: [],
    cheevos: 0,

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

        let s = findInArray(self.store,'id',item.id);
        let n = self.store[s];
        n.showDesc = false;
        self.inventory.push(n);
        
        //self.store.splice(i,1);
        removeFromArray(self.store,'id',item.id);
        self.buyItemEffect(item.id);
      }

      sendEvent('item purchase', item.name, item.price);
      
      if (self.inventory.length == 1) {
        self.getCheevo('Shopping In Hades!', 'First item purchased.', 10);
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
      } else if (id == 7) { // dignity
        
        // tbd?

      } else if (id == 8) { // persephone's ire
        self.s.pushForce = (self.s.pushForce * 1.2);
      } else if (id == 9) { // boner pills
        // does nothing
      } else if (id == 10) { // jock jams
        self.s.pushForce = (self.s.pushForce * 1.05);
      } else if (id == 11) { // hades fashion
        self.s.pushForce = (self.s.pushForce * 0.6);
      } else if (id == 12) { // deus ex machina
        self.r.height = (self.r.height * 2);
        self.r.width = (self.r.width * 2);
        self.r.marginLeft = (self.r.marginLeft * 2.7);
        self.s.pushForce = (self.s.pushForce * 0.3);
      } else if (id == 13) { // spite
        self.s.pushForce = (self.s.pushForce * 1.05);
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.05);
      } else if (id == 14) { // crampons
        self.s.pushForce = (self.s.pushForce * 1.4);
        self.s.retreatSpeed = (self.s.retreatSpeed * 0.6);
      } else if (id == 15) { // mountain goat blood
        self.s.pushForce = (self.s.pushForce * 0.6);
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.4);
      } else if (id == 16) { // yogurt pouch
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.18);
      } else if (id == 17) { // knee braces

        // does nothing

      } else if (id == 18) { // moral support
        self.r.height = (self.r.height * 1.2);
        self.r.width = (self.r.width * 1.2);
        self.r.marginLeft = (self.r.marginLeft * 1.4);
        self.s.pushForce = (self.s.pushForce * 0.83);
      } else if (id == 19) { // thanatos' chains
        self.s.pushForce = (self.s.pushForce * 0.4);

      } else if (id == 20) { // lemon water
        self.s.pushForce = (self.s.pushForce * 1.07);
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.07);
      } else if (id == 22) { // little league trophy
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.13);
      } else if (id == 23) { // sand paper
        self.r.height = (self.r.height * 0.8);
        self.r.width = (self.r.width * 0.8);
        self.r.marginLeft = (self.r.marginLeft * 0.9);
        self.s.pushForce = (self.s.pushForce * 1.4);
      } else if (id == 24) { // stickers (scented)
        self.s.pushForce = (self.s.pushForce * 0.8);
      } else if (id == 25) { // stickers (puffy)
        self.r.height = (self.r.height * 1.15);
        self.r.width = (self.r.width * 1.15);
        self.r.marginLeft = (self.r.marginLeft * 1.21);
        self.s.pushForce = (self.s.pushForce * 1.18);
      } else if (id == 27) { // firecrackers
        self.r.height = (self.r.height * 0.8);
        self.r.width = (self.r.width * 0.8);
        self.r.marginLeft = (self.r.marginLeft * 0.9);
        self.s.pushForce = (self.s.pushForce * 1.18);
      } else if (id == 28) { // bedazzler
        self.r.height = (self.r.height * 1.27);
        self.r.width = (self.r.width * 1.27);
        self.r.marginLeft = (self.r.marginLeft * 1.36);
        self.s.pushForce = (self.s.pushForce * 0.78);
      } else if (id == 29) { // espresso
        self.s.retreatSpeed = (self.s.retreatSpeed * 1.6);
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
    },


    getCheevo(title,text,points) {
      let self = this;
      if (!title) { title  = null; }
      if (!text) { text  = null; }
      let t;
      if (points) { 
        t = '<strong>'+points+'💀</strong> '+text;
        self.cheevos = self.cheevos + points;
      } else {
        t = text;
      }

      if (title && text) {
        sendEvent("cheevo", title, text);
      } else if (title && points) {
        sendEvent("cheevo", title, points);
      } else if (text && points) {
        sendEvent("cheevo", text, points);
      } else if (text) {
        sendEvent("cheevo", text);
      } else if (title) {
        sendEvent("cheevo", title);
      }


      new PNotify({
        title: title,
        text: t
      });

    },

    everySecond() {
      let self = this;
      self.secondsPlayed++;

      if (self.secondsPlayed == 1) {
        self.getCheevo('Achievement Unlocked', 'You have come to this website.', 1);
      } else if (self.secondsPlayed == 10) {
        self.getCheevo('Achievement Unlocked', 'You have played the game for '+self.secondsPlayed+' seconds.', 5);
      } else  if (self.secondsPlayed == 60) {
        self.getCheevo('One minute mark!', 'You have played the game for one minute.', 10);
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
        if (self.totalScore >= item.scoreToReveal) {
          a.push(item);
        }
      });
      return a;
    }

  },

  mounted: function() {
    let self = this;

    setInterval(function () {
      //alert('hit');
      self.everySecond();
    }, 1000); 
  }

});
