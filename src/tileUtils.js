import {
  POLYGON_TIP_RADIUS,
  POLYGON_OFFSET,
  POLYGON_EDGE_RADIUS,
} from './consts';

export function GetPaths(tiles) {
  function getPathRecursive(tileIndex, lineIndex, path) {
    let key = tileIndex + '-' + lineIndex;
    path.lines[key] = [tileIndex, lineIndex];
    let tile = tiles[tileIndex];
    let line = tile.lines[lineIndex];
    for (let i = 0; i < 2; i++) {
      let dir = line[i];
      let oppositeDir = (dir + 3) % 6;
      let neighborTileIndex = tile.neighbors[dir];
      if (neighborTileIndex == null) {
        path.loop = false;
        continue;
      }
      for (let ii = 0; ii < 3; ii++) {
        let k = neighborTileIndex + '-' + ii;
        if (k in path.lines) continue;
        let neighborLine = tiles[neighborTileIndex].lines[ii];
        if (neighborLine.includes(oppositeDir)) {
          getPathRecursive(neighborTileIndex, ii, path);
          break;
        }
      }
    }
  }

  let pathsByLine = {};
  let paths = [];
  for (let i in tiles) {
    for (let ii = 0; ii < 3; ii++) {
      let key = i + '-' + ii;
      if (key in pathsByLine) continue;
      let path = { lines: {}, loop: true };
      getPathRecursive(i, ii, path);
      for (let k in path.lines) {
        pathsByLine[k] = paths.length;
      }
      paths.push(path);
    }
  }
  return { paths, pathsByLine };
}

export function GetRandomTile() {
  const symbols = ['🔥', '💧', '🪨', '💨', '🌿', '⚙️', '☀️', '🌑', '🗝', '⛓'];
  let indices = [0, 1, 2, 3, 4, 5];
  let lines = [];
  for (let _ = 0; _ < 3; _++) {
    let line = [];
    for (let _ = 0; _ < 2; _++) {
      let randi = Math.floor(Math.random() * indices.length);
      line.push(indices[randi]);
      indices.splice(randi, 1);
    }
    line = [
      ...line,
      Math.random() > 0.25
        ? false
        : symbols[Math.floor(Math.random() * symbols.length)],
    ];
    lines.push(line);
  }
  return { lines };
}

export function CenterPiece(piece) {
  let centerX = 0;
  let centerY = 0;
  for (let tile of piece.tiles) {
    let y = tile.y;
    let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
    y *= POLYGON_OFFSET;
    centerX += x / piece.tiles.length;
    centerY += y / piece.tiles.length;
  }
  centerX += POLYGON_EDGE_RADIUS;
  centerY += POLYGON_TIP_RADIUS;
  return { ...piece, centerX, centerY };
}

export function RotatePiece(piece) {
  const cos = Math.cos(Math.PI / 3);
  const sin = Math.sin(Math.PI / 3);
  for (let tile of piece.tiles) {
    for (let line of tile.lines) {
      line[0] = (line[0] + 1) % 6;
      line[1] = (line[1] + 1) % 6;
    }
    let y = tile.y;
    let x = tile.x + tile.y / 2;
    tile.y = Math.round(x * sin + y * cos);
    tile.x = Math.round(x * cos - y * sin - tile.y / 2);
  }
  return CenterPiece(piece);
}

export function GetRandomPiece() {
  let tiles = [
    { ...GetRandomTile(), x: 0, y: 0 },
    { ...GetRandomTile(), x: 1, y: 0 },
    { ...GetRandomTile(), x: 0, y: 1 },
  ];
  return CenterPiece({ tiles });
}
