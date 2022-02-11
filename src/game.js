import React from 'react';
import {
  POLYGON_TIP_RADIUS,
  POLYGON_OFFSET,
  POLYGON_EDGE_RADIUS,
} from './consts';

import {
  GetPaths,
  GetRandomTile,
  GetRandomPiece,
  RotatePiece,
} from './tileUtils';

import PlayArea from './playArea';
import Tile from './tile';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    let tiles = [
      {
        ...GetRandomTile(),
        x: 0,
        y: 0,
        neighbors: [null, null, null, null, null, null],
      },
    ];
    this.state = {
      pathData: GetPaths(tiles),
      currentPiece: GetRandomPiece(),
      mouseX: 0,
      mouseY: 0,
      tiles,
    };
  }

  onMove = (e) => {
    if (this.state.currentPiece == null) return;
    this.setState((prev) => {
      return {
        mouseX: e.clientX,
        mouseY: e.clientY,
      };
    });
  };

  placePiece = (spot) => {
    if (this.state.currentPiece == null) return;
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [0, -1],
      [1, -1],
    ];
    this.setState((prev) => {
      for (let tile of prev.currentPiece.tiles) {
        let neighbors = [];
        for (let side = 0; side < 6; side++) {
          let dir = directions[side];
          let targetX = spot.x + dir[0];
          let targetY = spot.y + dir[1];
          let connected = null;
          for (let i in prev.tiles) {
            let otherTile = prev.tiles[i];
            if (otherTile.x != targetX || otherTile.y != targetY) continue;
            connected = i;
            otherTile.neighbors[(side + 3) % 6] = prev.tiles.length;
            break;
          }
          neighbors.push(connected);
        }
        let newPiece = {
          ...tile,
          x: spot.x + tile.x,
          y: spot.y + tile.y,
          neighbors,
        };
        prev.tiles.push(newPiece);
      }
      return {
        pathData: GetPaths(prev.tiles),
        currentPiece: GetRandomPiece(),
        tiles: prev.tiles,
      };
    });
  };

  onkeypress = (e) => {
    e = e || window.event;
    if (e.keyCode == 32 && this.state.currentPiece != null) {
      // ROTATE
      this.setState((prev) => {
        return { currentPiece: RotatePiece(prev.currentPiece) };
      });
    } else if (e.keyCode == 27) {
      this.setState({ currentPiece: null });
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onkeypress, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onkeypress, false);
  }

  render() {
    let heldTiles = [];
    let cp = this.state.currentPiece;
    if (cp != null) {
      for (let i in cp.tiles) {
        let tile = cp.tiles[i];
        let y = tile.y;
        let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
        y *= POLYGON_OFFSET;
        heldTiles.push(
          <Tile
            key={'heldTile_' + i}
            lines={tile.lines}
            x={x + this.state.mouseX - cp.centerX}
            y={y + this.state.mouseY - cp.centerY}
          />
        );
      }
    }
    return (
      <div className="fullscreen" onMouseMove={this.onMove}>
        <PlayArea
          tiles={this.state.tiles}
          placePiece={this.placePiece}
          pathData={this.state.pathData}
          placementPosition={
            cp == null
              ? { x: 0, y: 0 }
              : {
                  c: this.state.mouseX - cp.centerX,
                  y: this.state.mouseY - cp.centerY,
                }
          }
        />
        {heldTiles}
      </div>
    );
  }
}
