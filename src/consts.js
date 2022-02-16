export const POLYGON_TIP_RADIUS = 56;
export const POLYGON_EDGE_RADIUS = POLYGON_TIP_RADIUS * Math.cos(Math.PI / 6);
export const POLYGON_OFFSET = POLYGON_TIP_RADIUS * (1 + Math.cos(Math.PI / 3));

export const SIDEBAR_WIDTH = POLYGON_EDGE_RADIUS * 9.7;

export const playerColors = [
  ['#fcc', '#500'],
  ['#cfc', '#030'],
  ['#bef', '#008'],
  ['#feb', '#520'],
  ['#fdf', '#505'],
  ['#cff', '#055'],
];

export const colorMapping = [
  [null, null, null, null, null, null],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1],
  [0, 1, 2, 0, 1, 2],
  [null, 0, 1, null, 2, 3],
  [null, 0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4, 5],
];
