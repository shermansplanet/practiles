export const elements = ['🔥', '💧', '💨', '🪨', '🩸', '💀'];

export const components = {
  // 1 POWER
  '🔥': { name: 'fire spirits', p: ['🔥'], s: [] },
  '💧': { name: 'water spirits', p: ['💧'], s: [] },
  '💨': { name: 'air spirits', p: ['💨'], s: [] },
  '🪨': { name: 'earth spirits', p: ['🪨'], s: [] },
  '🩸': { name: 'blood', p: ['🩸'], s: [] },
  '💀': { name: 'skull', p: ['💀'], s: [] },

  // 1 STRUCTURE
  '🕯': { name: 'candle', p: [], s: ['🔥'] },
  '🧊': { name: 'ice', p: [], s: ['💧'] },
  '🎈': { name: 'balloon', p: [], s: ['💨'] },
  '🧱': { name: 'brick', p: [], s: ['🪨'] },
  '🫀': { name: 'heart', p: [], s: ['🩸'] },
  '🦴': { name: 'bones', p: [], s: ['💀'] },

  // 1 POWER, 1 STRUCTURE
  '🪦': { name: 'tombstone', p: ['💀'], s: ['🪨'] },
  '🫁': { name: 'lungs', p: ['💨'], s: ['🩸'] },
};
