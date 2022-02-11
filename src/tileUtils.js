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
