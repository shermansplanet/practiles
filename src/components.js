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
    { p: ['🩸'], s: ['🩸'] }
  ),

  ...Batch(
    {
      '🐙': 'Octopus',
      '🦑': 'Squid',
      '🦀': 'Crab',
      '🐟': 'Fish',
      '🦈': 'Shark',
    },
    { p: ['💧'], s: ['🩸'] }
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
    { p: ['💨'], s: ['🩸'] }
  ),

  ...Batch({ '🪱': 'Earthworm', '🪲': 'Beetle' }, { p: ['🪨'], s: ['🩸'] }),

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
  '🔥': { name: 'Fire Spirits', p: ['🔥'], s: [] },
  '💧': { name: 'Water Spirits', p: ['💧'], s: [] },
  '💨': { name: 'Air Spirits', p: ['💨'], s: [] },
  '🪨': { name: 'Earth Spirits', p: ['🪨'], s: [] },
  '🩸': { name: 'Lifeblood', p: ['🩸'], s: [] },
  '💀': { name: 'Omen of Death', p: ['💀'], s: [] },
  '🌿': { name: 'Nature Spirits', p: ['🌿'], s: [] },
  '⚙️': { name: 'Technology Spirits', p: ['⚙️'], s: [] },
  '🔆': { name: 'Token of Clarity', p: ['🔆'], s: [] },
  '🌀': { name: 'Token of Mystery', p: ['🌀'], s: [] },
  '💩': { name: 'Filthy Words', p: ['💩'], s: [] },
  '✨': { name: 'Pinch of Glamour', p: ['✨'], s: [] },
  '🧶': { name: 'Binding Thread', p: ['🧶'], s: [] },
  '🗝': { name: 'Escape Key', p: ['🗝'], s: [] },

  '☀️': { name: 'Sunlight', p: ['🔆'], s: [] },
  '🌒': { name: 'Moonlight', p: ['🌀'], s: [] },

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
  '👺': { name: 'Mask', p: [], s: ['🌀'] },
  '🦠': { name: 'Industrial Waste', p: [], s: ['💩'] },
  '💍': { name: 'Ring', p: [], s: ['✨'] },
  '🔒': { name: 'Lock', p: [], s: ['🧶'] },
  '🛼': { name: 'Roller Skates', p: [], s: ['🗝'] },

  '🛹': { name: 'Skateboard', p: [], s: ['🗝'] },

  // 2 POWER
  '💥': { name: 'Combustion Elemental', p: ['🔥', '🔥'], s: [] },
  '🌊': { name: 'Tidal Elemental', p: ['💧', '💧'], s: [] },
  '🌪': { name: 'Vortex Elemental', p: ['💨', '💨'], s: [] },
  '⛰': { name: 'Mountain Elemental', p: ['🪨', '🪨'], s: [] },
  '🥩': { name: 'Divine Flesh', p: ['🩸', '🩸'], s: [] },
  '🍎': { name: 'Apple of Vitality', p: ['🌿', '🩸'], s: [] },
  '⚱️': { name: 'Funerary Urn', p: ['💀', '💀'], s: [] },
  '🔮': { name: 'Crystal Ball', p: ['🔆', '🔆'], s: [] },

  '🌋': { name: 'Volcano Elemental', p: ['🪨', '🔥'], s: [] },
  '👻': { name: 'Flickering Echo', p: ['🌀', '💀'], s: [] },
  '👾': { name: 'Digital Construct', p: ['⚙️', '⚙️'], s: [] },

  // 1 POWER, 1 STRUCTURE
  '🪦': { name: 'Tombstone', p: ['💀'], s: ['🪨'] },
  '🫁': { name: 'Lungs', p: ['💨'], s: ['🩸'] },
  '🎃': { name: 'Jack-o-Lantern', p: ['🌀'], s: ['🔥'] },
  '👁': { name: 'Eye', p: ['🔆'], s: ['🩸'] },
  '🧚': { name: 'Fairy Glamour', p: ['🌀'], s: ['💨'] },
  '⚓️': { name: 'Anchor', p: ['🧶'], s: ['💧'] },
  '🧭': { name: 'Compass', p: ['⚙️'], s: ['🗝'] },
  '🧲': { name: 'Magnet', p: ['🧶'], s: ['⚙️'] },
  '🤮': { name: 'Goblin Bile', p: ['💩'], s: ['💩'] },
  '🧨': { name: 'Firecracker', p: ['🔥'], s: ['🔥'] },
  '🪡': { name: 'Needle and Thread', p: ['🧶'], s: ['🧶'] },
  '👑': { name: 'Crown', p: ['✨'], s: ['✨'] },
  '💄': { name: 'Expensive Lipstick', p: ['✨'], s: ['🌀'] },
  '🤡': { name: 'Clown Face', p: ['💩'], s: ['🌀'] },
};
