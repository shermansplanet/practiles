export function GetPaths(tiles) {
  function getPathRecursive(key, path) {}

  paths = {};
  for (let i in tiles) {
    let tile = tiles[i];
    for (let ii = 0; ii < 3; ii++) {
      let key = i + '-' + ii;
      if (key in paths) continue;
      path = getPathRecursive(key, []);
    }
  }
}
