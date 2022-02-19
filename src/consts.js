export const POLYGON_TIP_RADIUS = 56;
export const POLYGON_EDGE_RADIUS = POLYGON_TIP_RADIUS * Math.cos(Math.PI / 6);
export const POLYGON_OFFSET = POLYGON_TIP_RADIUS * (1 + Math.cos(Math.PI / 3));

export const SIDEBAR_WIDTH = POLYGON_EDGE_RADIUS * 9.7;

export const playerColors = [
  ['#030', '#cfc', '#0f0'],
  ['#008', '#bef', '#00f'],
  ['#520', '#feb', '#a40'],
  ['#505', '#fdf', '#a0a'],
  ['#055', '#cff', '#0aa'],
  ['#500', '#fcc', '#f00'],
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
