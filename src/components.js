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
    { '🐭': 'Mouse', '🐰': 'Hare', '🦊': 'Fox', '🐷': 'Pig' },
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
      '🦋': 'Butterfly',
    },
    { p: ['💨'], s: ['🩸'], isBase: true }
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
    a: ['Evasive', 'Fleeting', 'Escape'],
  },

  '☀️': { name: 'Sunlight', p: ['🔆'], s: [], a: ['Sun', 'Solar'] },
  '🌒': { name: 'Moonlight', p: ['🌀'], s: [], a: ['Moon', 'Lunar'] },

  // 1 STRUCTURE
  '🕯': { name: 'Candle', p: [], s: ['🔥'] },
  '🧊': { name: 'Ice', p: [], s: ['💧'] },
  '🎈': { name: 'Balloon', p: [], s: ['💨'] },
  '🧱': { name: 'Brick', p: [], s: ['🪨'] },
  '🫀': { name: 'Heart', p: [], s: ['🩸'] },
  '🦴': { name: 'Bones', p: [], s: ['💀'] },
  '🪵': { name: 'Wood', p: [], s: ['🌿'] },
  '🔌': { name: 'Wires', p: [], s: ['⚙️'] },
  '🔎': { name: 'Lens', p: [], s: ['🔆'] },
  '👹': { name: 'Mask', p: [], s: ['🌀'] },
  '🦠': { name: 'Foul Waste', p: [], s: ['💩'] },
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
  '⛰': { name: 'Mountain Elemental', p: ['🪨', '🪨'], s: [] },
  '🥩': { name: 'Divine Flesh', p: ['🩸', '🩸'], s: [] },
  '🍎': { name: 'Apple of Vitality', p: ['🌿', '🩸'], s: [] },
  '🔮': { name: 'Crystal Ball', p: ['🔆', '🔆'], s: [] },

  '🌋': { name: 'Volcano Elemental', p: ['🪨', '🔥'], s: [] },
  '👻': { name: 'Flickering Echo', p: ['🌀', '💀'], s: [] },
  '👾': { name: 'Digital Construct', p: ['⚙️', '⚙️'], s: [] },
  '🗡': { name: 'Cursed Dagger', p: ['💀', '💀'], s: [] },
  '❤️‍🔥': { name: 'Vitae', p: ['🔥', '🩸'], s: [] },

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
  '🧨': { name: 'Firecracker', p: ['🔥'], s: ['🔥'] },
  '🪡': { name: 'Needle and Thread', p: ['🧶'], s: ['🧶'] },
  '👑': { name: 'Crown', p: ['✨'], s: ['✨'], a: ['Crowned'] },
  '💄': { name: 'Expensive Lipstick', p: ['✨'], s: ['🌀'] },
  '🤡': { name: 'Clown Mask', p: ['💩'], s: ['🌀'], isBase: 'Clown' },
  '🦷': { name: 'Pulled Tooth', p: ['💩'], s: ['💀'], a: ['Tooth'] },
};

export function GetName(summon) {
  let structures = [];
  let powers = [];
  let both = [];
  let otherType = 'Spirit';
  let specialType = false;
  for (let symbol of summon.parts) {
    let part = components[symbol];
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
    var random = array.map((x) => Math.random + 10 - x.p.length - x.s.length);
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
    let sparts = structures[0].name.split(' ');
    words.push(sparts[sparts.length - 1]);
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
