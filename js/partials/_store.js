const storeItems = [
  {
    id: 1, name: "fresh kicks", price: 85, scoreToReveal: 60,
    desc: "Better arch support means that you can move slightly faster",
    showDesc: false
  },
  {
    id: 2, name: "small pickaxe", price: 100, scoreToReveal: 91,
    desc: "It's not the sharpest, but it's enough to carve out a little bit of the rock to make it slightly smaller.",
    showDesc: false
  },
  {
    id: 3, name: "a whole bunch of gum", price: 50, scoreToReveal: 115,
    desc: "Gum, and like, a considerable amount of it. Enough to stick to the boulder to make the boulder bigger and possibly stick to the hill.",
    showDesc: false
  },
  {
    id: 4, name: "analgesic heat rub", price: 70, scoreToReveal:140,
    desc: "Smells terrible! But should allow you to push to boulder a little bit faster.",
    showDesc: false
  },
  {
    id: 5, name: "Peach Tea", price: 160, scoreToReveal:195,
    desc: "a 20 ounce can of peach tea. Tastes pretty good. Probably won't help you with that rock pushing thing.",
    showDesc: false
  },
  {
    id: 6, name: "Heelies", price: 140, scoreToReveal: 235,
    desc: "You know, those shoes with the wheels on them. Will make it easier to go downhill, and probably harder to go uphill."
  },
  {
    id: 7, name: "Dignity", price: 9999, scoreToReveal: 300,
    desc: "You've played this game for far too long. I'm taking your diginity and you can buy it back."
  },
  {
    id: 8, name: "Persephone's Ire", price: 85, scoreToReveal: 200,
    desc: "She's still mad you tricked her to get out of hell, and the palpable rage will help you push the boulder up faster to get away."
  },
  {
    id: 9, name: "Zeus' Boner Pills", price: 69, scoreToReveal: 200,
    desc: "Must have fallen from Olympus. Won't help with the boulder, but great for when you get out of hell!"
  },
  {
    id: 10, name: "Underworld Jock Jams", price: 55, scoreToReveal: 220,
    desc: "Some fresh beats to really get your heart pumping! Helps you push the boulder up the hill faster."
  },
  {
    id: 11, name: "Hades Haute Couture", price: 275, scoreToReveal: 220,
    desc: "Mainly an aesthetic of ash, chains and sackcloth that is very much de riguer in the underworld. Makes pushing the boulder significantly harder."
  },
  {
    id: 12, name: "Deus Ex Machina", price: 250, scoreToReveal: 500,
    desc: "Having forgotten you were doing this for so long, the gods finally remember you exist, then mock you with a new heavier boulder."
  },
  {
    id: 13, name: "Spite", price: 40, scoreToReveal: 300,
    desc: "Your greatest resource!"
  },
  {
    id: 14, name: "Crampons", price: 50, scoreToReveal: 250,
    desc: "These mountain cleats will help you push up the boulder faster, but walking down in them is pretty tough."
  },
  {
    id: 15, name: "Mountain Goat Blood", price: 62, scoreToReveal: 150,
    desc: "The gods start meddling with your bloodline and suddenly you are part mountain goat. Getting down is easier, but the hooves make it harder to push the boulder."
  },
  {
    id: 16, name: "Yogurt Pouch", price: 15, scoreToReveal: 275,
    desc: "Pushing for eternity makes you hungry. Get a protein rich snack to keep going."
  },
  {
    id: 17, name: "Knee Braces", price: 35, scoreToReveal: 275,
    desc: "Doesn't really do much, but makes you feel better at least."
  },
  {
    id: 18, name: "Moral Support", price: 125, scoreToReveal: 275,
    desc: "You somehow have a friend left on Earth? It's a small comfort in your eternal task."
  },
  {
    id: 19, name: "Thanatos Remembers", price: 666, scoreToReveal: 300,
    desc: "Thanatos gives you back your chains, assured that you know how to use them."
  },
  {
    id: 20, name: "Effervescent Lemon Water", price: 2, scoreToReveal: 150,
    desc: "Refreshing, you think? Mostly useless though."
  },
  {
    id: 21, name: "Bucket O' Aspirin", price: 60, scoreToReveal: 325,
    desc: "It's not for Sisyphus, but for you. Your finger is probably all messed up. Helps the boulder go up faster."
  },
  {
    id: 22, name: "1st Place Trophy", price: 25, scoreToReveal: 325,
    desc: "For a Little League Baseball game. Makes you swell up with pride and push the boulder faster."
  },
  {
    id: 23, name: "Sand Paper", price: 40, scoreToReveal: 325,
    desc: "A giant box of 20 grit sand paper. Helps whittle down the boulder a little bit."
  },
  {
    id: 24, name: "Stickers (Scented)", price: 30, scoreToReveal: 350,
    desc: "A couple packs of scented stickers. You push the boulder slower because you're trying to smell the stickers, but you run down the hill faster."
  },
  {
    id: 25, name: "Stickers (Puffy)", price: 35, scoreToReveal: 351,
    desc: "A couple packs of puffy stickers. Cushions the boulder, but also makes it bigger."
  },
  {
    id: 26, name: "Severe Hallucinations", price: 177, scoreToReveal: 350,
    desc: "Could be good?"
  },
  {
    id: 27, name: "A Million Packs of Firecrackers", price: 75, scoreToReveal: 350,
    desc: "Not only exciting to watch, but makes the boulder a little smaller."
  },
  {
    id: 28, name: "Bedazzler", price: 112, scoreToReveal: 375,
    desc: "The boulder is bigger, but at least more exciting to push up the hill."
  },
  {
    id: 29, name: "Espresso Drip", price: 125, scoreToReveal: 370,
    desc: "One of those beer hats, but filled with espresso. Helps you run down the hill faster."
  },
  {
    id: 30, name: "Part-Time Intern", price: 0, scoreToReveal: 380,
    desc: "An intern looking for Greek History credits and experience. Only there to help you push up the boulder."
  }
];
