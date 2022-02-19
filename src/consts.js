export const POLYGON_TIP_RADIUS = 56;
export const POLYGON_EDGE_RADIUS = POLYGON_TIP_RADIUS * Math.cos(Math.PI / 6);
export const POLYGON_OFFSET = POLYGON_TIP_RADIUS * (1 + Math.cos(Math.PI / 3));

export const SIDEBAR_WIDTH = POLYGON_EDGE_RADIUS * 9.7;

export const playerColors = [
  ['#afa', '#040', '#0a0'],
  ['#fd9', '#631', '#c40'],
  ['#bcf', '#228', '#36f'],
  ['#fbf', '#615', '#c0c'],
  ['#aee', '#055', '#099'],
  ['#fbb', '#601', '#f00'],
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
