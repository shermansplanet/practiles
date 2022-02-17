export const elements = [
  '🔥',
  '💧',
  '💨',
  '🪨',
  '🩸',
  '💀',
  '🌿',
  '⚙️',
  '🔆',
  '🌀',
  '💩',
  '✨',
  '🧶',
  '🗝',
];

function Batch(names, stats) {
  let batch = {};
  for (let n in names) {
    batch[n] = { name: names[n], ...stats };
  }
  return batch;
}

export const components = {
  ...Batch(
    {
      '🐭': 'Mouse',
      '🐰': 'Hare',
      '🦊': 'Fox',
      '🐷': 'Pig',
      '🐸': 'Frog',
      '🐱': 'Cat',
      '🐶': 'Dog',
      '🐀': 'Rat',
    },
    { p: ['🩸'], s: ['🩸'], isBase: true }
  ),

  ...Batch(
    {
      '🐙': 'Octopus',
      '🦑': 'Squid',
      '🦀': 'Crab',
      '🐟': 'Fish',
      '🦈': 'Shark',
    },
    { p: ['💧'], s: ['🩸'], isBase: true }
  ),

  ...Batch(
    {
      '🐦': 'Pigeon',
      '🦅': 'Eagle',
      '🦆': 'Duck',
      '🦉': 'Owl',
      '🦇': 'Bat',
    },
    { p: ['💨'], s: ['🩸'], isBase: true }
  ),

  ...Batch(
    {
      '🦋': 'Butterfly',
      '🦚': 'Peacock',
    },
    { p: ['✨'], s: ['🩸'], isBase: true }
  ),

  ...Batch(
    { '🪱': 'Earthworm', '🪲': 'Beetle' },
    { p: ['🪨'], s: ['🩸'], isBase: true }
  ),

  ...Batch(
    {
      '🌱': 'Sprout',
      '🌵': 'Cactus',
      '🌴': 'Palm Leaf',
      '☘️': 'Clover',
      '🌾': 'Grain',
    },
    { p: ['🌿'], s: ['🩸'] }
  ),

  // 1 POWER
  '🔥': { name: 'Fire Spirits', p: ['🔥'], s: [], a: ['Fire'] },
  '💧': { name: 'Water Spirits', p: ['💧'], s: [], a: ['Water'] },
  '💨': { name: 'Air Spirits', p: ['💨'], s: [], a: ['Air'] },
  '🪨': { name: 'Earth Spirits', p: ['🪨'], s: [], a: ['Earth'] },
  '🩸': { name: 'Lifeblood', p: ['🩸'], s: [], a: ['Blood', 'Vital'] },
  '💀': {
    name: 'Omen of Death',
    p: ['💀'],
    s: [],
    a: ['Deadly', 'Death', 'Fated'],
  },
  '🌿': { name: 'Nature Spirits', p: ['🌿'], s: [], a: ['Natural', 'Nature'] },
  '⚙️': { name: 'Technology Spirits', p: ['⚙️'], s: [], a: ['Mechanical'] },
  '🔆': {
    name: 'Token of Clarity',
    p: ['🔆'],
    s: [],
    a: ['Radiant', 'Keen', 'Glowing'],
  },
  '🌀': {
    name: 'Token of Mystery',
    p: ['🌀'],
    s: [],
    a: ['Mysterious', 'Indistinct', 'Dark'],
  },
  '💩': {
    name: 'Filthy Words',
    p: ['💩'],
    s: [],
    a: ['Filthy', 'Disgusting', 'Revolting', 'Gross'],
    isBase: 'Goblin',
  },
  '✨': {
    name: 'Pinch of Glamour',
    p: ['✨'],
    s: [],
    a: ['Enchanting', 'Enthralling'],
    isBase: 'Ephemera',
  },
  '🧶': {
    name: 'Binding Thread',
    p: ['🧶'],
    s: [],
    a: ['Binding', 'Trap', 'Ensnaring'],
  },
  '🗝': {
    name: 'Escape Key',
    p: ['🗝'],
    s: [],
    a: ['Evasive', 'Swift', 'Escape'],
  },

  '☀️': { name: 'Sunlight', p: ['🔆'], s: [], a: ['Sun', 'Solar'] },
  '🌒': { name: 'Moonlight', p: ['🌀'], s: [], a: ['Moon', 'Lunar'] },

  // 1 STRUCTURE
  '🕯': { name: 'Candle', p: [], s: ['🔥'] },
  '🧊': { name: 'Ice', p: [], s: ['💧'] },
  '🎈': { name: 'Balloon', p: [], s: ['💨'] },
  '🧱': { name: 'Brick', p: [], s: ['🪨'] },
  '🫀': { name: 'Heart', p: [], s: ['🩸'] },
  '🦴': { name: 'Bones', p: [], s: ['💀'], n: ['Skeleton'] },
  '🪵': { name: 'Wood', p: [], s: ['🌿'] },
  '🔌': { name: 'Wires', p: [], s: ['⚙️'] },
  '🔎': { name: 'Lens', p: [], s: ['🔆'] },
  '👹': { name: 'Mask', p: [], s: ['🌀'] },
  '🦠': { name: 'Foul Waste', p: [], s: ['💩'], isBase: 'Goblin' },
  '💍': { name: 'Ring', p: [], s: ['✨'] },
  '🔒': { name: 'Lock', p: [], s: ['🧶'] },
  '🛼': { name: 'Roller Skates', p: [], s: ['🗝'] },

  '🛹': { name: 'Skateboard', p: [], s: ['🗝'] },
  '🚲': { name: 'Bicycle Wheel', p: [], s: ['🗝'] },
  '⚱️': { name: 'Funerary Urn', p: [], s: ['💀'] },

  // 2 POWER
  '💥': { name: 'Combustion Elemental', p: ['🔥', '🔥'], s: [] },
  '🌊': { name: 'Tidal Elemental', p: ['💧', '💧'], s: [] },
  '🌪': { name: 'Vortex Elemental', p: ['💨', '💨'], s: [] },
  '🌬': { name: 'Howling Winds', p: ['🌿', '💨'], s: [] },
  '🌩': { name: 'Tempest Constituent', p: ['💧', '💨'], s: [] },
  '⛰': { name: 'Mountain Elemental', p: ['🪨', '🪨'], s: [] },
  '🥩': { name: 'Divine Flesh', p: ['🩸', '🩸'], s: [] },
  '🍎': { name: 'Apple of Vitality', p: ['🌿', '🩸'], s: [] },
  '☂️': { name: 'Umbrella', p: ['⚙️'], s: ['💧'] },

  '🌋': { name: 'Volcano Elemental', p: ['🪨', '🔥'], s: [] },
  '👻': { name: 'Flickering Echo', p: ['🌀', '💀'], s: [] },
  '👾': { name: 'Digital Construct', p: ['⚙️', '⚙️'], s: [] },
  '🗡': { name: 'Cursed Dagger', p: ['💀', '💀'], s: [] },
  '❤️‍🔥': {
    name: 'Bottled Vitae',
    p: ['🔥', '🩸'],
    s: [],
    isBase: 'Homunculus',
  },
  '🌟': {
    name: 'Bottled Clarity',
    p: ['💨', '🔆'],
    s: [],
    isBase: 'Homunculus',
  },
  '🪢': {
    name: 'Bottled Connections',
    p: ['💧', '🧶'],
    s: [],
    isBase: 'Homunculus',
  },
  '💰': { name: 'Bottled Value', p: ['🪨', '✨'], s: [], isBase: 'Homunculus' },
  '🧂': { name: 'Salt', p: ['🩸', '🧶'], s: [] },
  '🎟': { name: 'Lost Ticket', p: ['🗝', '🌀'], s: [] },
  '🎭': { name: 'Theatrics', p: ['✨', '🌀'], s: [] },

  '🤯': { name: 'Epiphany Echo', p: ['🔆', '🔆'], s: [], isBase: 'Wraith' },
  '🥶': { name: 'Hypothermic Echo', p: ['💀', '💧'], s: [], isBase: 'Wraith' },
  '🤢': { name: 'Mutilated Echo', p: ['💩', '💀'], s: [], isBase: 'Wraith' },
  '😁': { name: 'Bliss', p: ['🔆', '✨'], s: [] },
  '🤐': { name: 'Silenced Echo', p: ['🌀', '🗝'], s: [], isBase: 'Wraith' },
  '😍': { name: 'Infatuated Echo', p: ['🌀', '✨'], s: [], isBase: 'Wraith' },

  // 1 POWER, 1 STRUCTURE
  '🪦': { name: 'Tombstone', p: ['💀'], s: ['🪨'], isBase: 'Revenant' },
  '🫁': { name: 'Lungs', p: ['💨'], s: ['🩸'], a: ['Breath'] },
  '🎃': { name: 'Jack-o-Lantern', p: ['🌀'], s: ['🔥'] },
  '👁': { name: 'Eye', p: ['🔆'], s: ['🩸'] },
  '🧚': { name: 'Fairy Glamour', p: ['🌀'], s: ['💨'], isBase: 'Ephemera' },
  '⚓️': { name: 'Anchor', p: ['🧶'], s: ['💧'], a: ['Anchored'] },
  '🧭': { name: 'Compass', p: ['⚙️'], s: ['🗝'] },
  '🧲': { name: 'Magnet', p: ['🧶'], s: ['⚙️'], a: ['Magnetic'] },
  '🤮': { name: 'Goblin Bile', p: ['💩'], s: ['💩'], a: ['Bilious'] },
  '🧨': { name: 'Firecracker', p: ['🔥'], s: ['🔥'], a: ['Explosive'] },
  '🪡': { name: 'Needle and Thread', p: ['🧶'], s: ['🧶'] },
  '👑': { name: 'Crown', p: ['✨'], s: ['✨'], a: ['Crowned'] },
  '💄': { name: 'Expensive Lipstick', p: ['✨'], s: ['🌀'] },
  '🤡': { name: 'Clown Mask', p: ['💩'], s: ['🌀'], n: ['Clown'] },
  '🦷': { name: 'Pulled Tooth', p: ['💩'], s: ['💀'], a: ['Tooth'] },
  '🔮': { name: 'Crystal Ball', p: ['🔆'], s: ['🔆'], n: ['Crystal'] },
  '🥸': { name: 'Spy Animus', p: ['🔆'], s: ['🌀'], n: ['Spy'] },
  '🤩': { name: 'Fascination', p: ['🧶'], s: ['🔆'] },
  '😡': { name: 'Enraged Echo', p: ['💀'], s: ['🔥'], isBase: 'Wraith' },
  '🕷': { name: 'Spider', p: ['🧶'], s: ['🩸'] },
  '🐈‍⬛': { name: 'Black Cat', p: ['🌀'], s: ['🩸'] },
  '🍁': { name: 'Autumn Leaves', p: ['🌿'], s: ['💀'] },
  '🌹': { name: 'Rose', p: ['🌿'], s: ['✨'] },
  '🌻': { name: 'Sunflower', p: ['🌿'], s: ['🔆'] },
  '🥀': { name: 'Withered Rose', p: ['🌿'], s: ['💀'] },
  '🍄': { name: 'Mushroom', p: ['🩸'], s: ['💀'] },
  '🪙': { name: 'Coin', p: ['🗝'], s: ['✨'] },
  '☁️': { name: 'Impenetrable Fog', p: ['💨'], s: ['🌀'] },
  '🌧': { name: 'Rainfall Spirit', p: ['💧'], s: ['🌿'], n: ['Rain'] },
  '❄️': { name: 'Snowdrift Spirit', p: ['🧶'], s: ['💧'] },
  '🍆': { name: 'Eggplant ;)', p: ['💩'], s: ['🌿'] },
  '🍦': {
    name: 'Ice Cream',
    p: ['🩸'],
    s: ['💧'],
    a: ['Ice Cream'],
    n: ['Ice Cream'],
  },
  '☕️': { name: 'Hot Tea', p: ['🩸'], s: ['🔥'] },
  '🏆': { name: 'Prized Trophy', p: ['✨'], s: ['✨'] },
  '🎤': { name: 'Microphone', p: ['💨'], s: ['⚙️'] },
  '💡': { name: 'Lightbulb', p: ['🔆'], s: ['⚙️'] },
  '📺': { name: 'Television', p: ['⚙️'], s: ['🔆'] },
};

export function GetName(summon) {
  let structures = [];
  let powers = [];
  let both = [];
  let otherType = 'Spirit';
  let specialType = false;
  let symbolCounts = {};
  for (let symbol of summon.parts) {
    let part = components[symbol];
    symbolCounts[part] = part in symbolCounts ? symbolCounts[part] + 1 : 1;
    if (!specialType && part.isBase) {
      otherType = part.isBase === true ? part.name : part.isBase;
      specialType = true;
      continue;
    }
    if (part.s.length == 0) {
      powers.push(part);
    } else if (part.p.length == 0) {
      structures.push(part);
    } else {
      both.push(part);
    }
  }
  while (both.length > 0) {
    let part = both.pop();
    if (structures.length < powers.length) {
      structures.push(part);
    } else {
      powers.push(part);
    }
  }

  function shuffle(array) {
    var random = array.map(
      (x) => Math.random + 100 - (x.p.length + x.s.length) - symbolCounts[x] * 3
    );
    array.sort(function (a, b) {
      return random[a] - random[b];
    });
  }

  shuffle(structures);
  shuffle(powers);
  let words = [];
  if (summon.sTypes.length == 0) {
    words.push('Unstable');
  }
  if (summon.pTypes.length == 0) {
    words.push('Inert');
  }
  if (powers.length > 0) {
    if (powers[0].a) {
      words.push(powers[0].a[Math.floor(Math.random() * powers[0].a.length)]);
    } else {
      words.push(powers[0].name.split(' ')[0]);
    }
  }
  if (structures.length > 0) {
    if (structures[0].n) {
      words.push(
        structures[0].n[Math.floor(Math.random() * structures[0].n.length)]
      );
    } else {
      let sparts = structures[0].name.split(' ');
      words.push(sparts[sparts.length - 1]);
    }
  }

  words.push(otherType);

  return words.join(' ');
}

// for (let _ = 0; _ < 5; _++) {
//   let parts = [];
//   let symbols = Object.keys(components);
//   let partcount = Math.ceil(Math.random() * 3);
//   let sTypes = [];
//   let pTypes = [];
//   for (let n = 0; n < partcount; n++) {
//     let symbol = symbols[Math.floor(Math.random() * symbols.length)];
//     parts.push(symbol);
//     let c = components[symbol];
//     sTypes.push(...c.s);
//     pTypes.push(...c.p);
//   }
//   let summon = { parts, pTypes, sTypes };

//   console.log(parts);
//   console.log(GetName(summon));
// }
