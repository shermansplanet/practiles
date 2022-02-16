export const POLYGON_TIP_RADIUS = 56;
export const POLYGON_EDGE_RADIUS = POLYGON_TIP_RADIUS * Math.cos(Math.PI / 6);
export const POLYGON_OFFSET = POLYGON_TIP_RADIUS * (1 + Math.cos(Math.PI / 3));

export const SIDEBAR_WIDTH = POLYGON_EDGE_RADIUS * 9.7;

export const playerColors = [
  ['#fcc', '#500', '#f00'],
  ['#cfc', '#030', '#0f0'],
  ['#bef', '#008', '#00f'],
  ['#feb', '#520', '#a40'],
  ['#fdf', '#505', '#a0a'],
  ['#cff', '#055', '#0aa'],
];

export const colorMapping = [
  [null, null, null, null, null, null],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 1],
  [1, 2, 2, 0, 0, 1],
  [null, 3, 2, null, 0, 1],
  [2, 3, 4, null, 0, 1],
  [2, 3, 4, 5, 0, 1],
];
