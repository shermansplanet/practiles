import {
  POLYGON_TIP_RADIUS,
  POLYGON_OFFSET,
  POLYGON_EDGE_RADIUS,
} from './consts';

import { components, elements } from './components';

var ps = '';
for (let i = 0; i < 6; i++) {
  let a = ((i + 0.5) * Math.PI) / 3;
  let vertx = Math.cos(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_EDGE_RADIUS;
  let verty = Math.sin(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_TIP_RADIUS;
  let centerstring = vertx + ',' + verty + ' ';
  ps += centerstring;
}

export const pointstring = ps;

export const directions = [
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
  [1, -1],
];

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
  let pathsById = {};
  let paths = [];
  for (let i in tiles) {
    for (let ii = 0; ii < 3; ii++) {
      let key = i + '-' + ii;
      if (key in pathsByLine) continue;
      let path = { lines: {}, loop: true, id: key };
      getPathRecursive(i, ii, path);
      for (let k in path.lines) {
        pathsByLine[k] = paths.length;
      }
      pathsById[key] = path;
      paths.push(path);
    }
  }
  return { paths, pathsByLine, pathsById };
}

export function GetRandomTile() {
  let indices = [0, 1, 2, 3, 4, 5];
  let lines = [];
  for (let _ = 0; _ < 3; _++) {
    let line = [];
    for (let _ = 0; _ < 2; _++) {
      let randi = Math.floor(Math.random() * indices.length);
      line.push(indices[randi]);
      indices.splice(randi, 1);
    }
    lines.push([...line, false]);
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

function ArrayIncludes(arr, el) {
  for (let a of arr) {
    let matches = true;
    for (let i in a) {
      if (el[i] != a[i]) {
        matches = false;
        break;
      }
    }
    if (matches) return true;
  }
  return false;
}

export function GetRandomPiece(tilecount, playerId, color) {
  let tiles = [];
  let takenPositions = [];
  let allLines = [];
  for (let i = 0; i < tilecount; i++) {
    let tile = GetRandomTile();
    if (i == 0) {
      tile.x = 0;
      tile.y = 0;
    } else {
      let possible = [];
      for (let otherpos of takenPositions) {
        for (let dir of directions) {
          let x = otherpos[0] + dir[0];
          let y = otherpos[1] + dir[1];
          if (
            ArrayIncludes(takenPositions, [x, y]) ||
            ArrayIncludes(possible, [x, y])
          )
            continue;
          possible.push([x, y]);
        }
      }
      let pos = possible[Math.floor(Math.random() * possible.length)];
      tile.x = pos[0];
      tile.y = pos[1];
    }
    tile.color = color;
    tile.playerId = playerId;
    allLines.push(...tile.lines);
    takenPositions.push([tile.x, tile.y]);
    tiles.push(tile);
  }

  function GetRemainder(sup, sub) {
    for (let a of sub) {
      if (sup.length == 0) return false;
      let i = sup.indexOf(a);
      if (i == -1) return false;
      sup.splice(i, 1);
    }
    return true;
  }
  let allKeys = Object.keys(components);

  function GetMatchingComponents(plist, slist, startIndex) {
    let matches = [];
    for (let i = startIndex; i < allKeys.length; i++) {
      let ci = i;
      let symbol = allKeys[i];
      let component = components[symbol];
      let pclone = [...plist];
      let sclone = [...slist];
      if (
        GetRemainder(pclone, component.p) &&
        GetRemainder(sclone, component.s)
      ) {
        if (pclone.length == 0 && sclone.length == 0) {
          matches.push([symbol]);
        } else {
          for (let match of GetMatchingComponents(pclone, sclone, ci)) {
            matches.push([symbol, ...match]);
          }
        }
      }
    }
    return matches;
  }

  const symbolCount = 3;
  let plist = [];
  let slist = [];
  for (let n = 0; n < symbolCount; n++) {
    let s = elements[Math.floor(Math.random() * elements.length)];
    (Math.random() < 0.4 ? slist : plist).push(s);
  }

  let componentLists = GetMatchingComponents(plist, slist, 0);
  let cl = componentLists[Math.floor(Math.random() * componentLists.length)];

  for (let s of cl) {
    let lineIndex = Math.floor(Math.random() * allLines.length);
    allLines[lineIndex][2] = s;
    allLines.splice(lineIndex, 1);
  }

  return CenterPiece({ tiles });
}
