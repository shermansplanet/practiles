import React from 'react';
import { POLYGON_OFFSET, POLYGON_EDGE_RADIUS } from './consts';

import {
  directions,
  GetPaths,
  GetRandomTile,
  GetRandomPiece,
  RotatePiece,
} from './tileUtils';

import { components } from './components';

import PlayArea from './playArea';
import Sidebar from './sidebar';
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
    let playerId = 'player_0';
    this.state = {
      sidebarPieces: [
        GetRandomPiece(1, playerId),
        GetRandomPiece(2, playerId),
        GetRandomPiece(3, playerId),
        GetRandomPiece(4, playerId),
      ],
      sidebarUpdateToggle: false,
      pathData: GetPaths(tiles),
      currentPiece: null,
      currentPieceIndex: null,
      mouseX: 0,
      mouseY: 0,
      tiles,
      playerId,
      summons: [],
    };
  }

  onMove = (e) => {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  select = (pieceIndex) => {
    this.setState({
      currentPieceIndex: parseInt(pieceIndex),
      currentPiece:
        pieceIndex == null
          ? null
          : JSON.parse(JSON.stringify(this.state.sidebarPieces[pieceIndex])),
    });
  };

  placePiece = (spot) => {
    if (this.state.currentPiece == null) return;
    this.setState((prev) => {
      for (let tile of prev.currentPiece.tiles) {
        let neighbors = [];
        for (let side = 0; side < 6; side++) {
          let dir = directions[side];
          let targetX = spot.x + tile.x + dir[0];
          let targetY = spot.y + tile.y + dir[1];
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
      let sidebarPieces = prev.sidebarPieces;
      sidebarPieces[prev.currentPieceIndex] = GetRandomPiece(
        prev.currentPieceIndex + 1,
        this.state.playerId
      );

      let pathData = GetPaths(prev.tiles);
      let summons = [];
      for (let pathId in pathData.pathsById) {
        let path = pathData.pathsById[pathId];
        if (
          path.loop &&
          (!(pathId in prev.pathData.pathsById) ||
            !prev.pathData.pathsById[pathId].loop)
        ) {
          summons.push(this.summonFromPath(path, prev.tiles));
        }
      }

      prev.summons.push(...summons);

      return {
        sidebarPieces,
        pathData,
        currentPiece: null,
        currentPieceIndex: null,
        tiles: prev.tiles,
        sidebarUpdateToggle: !prev.sidebarUpdateToggle,
        summons: prev.summons,
      };
    });
  };

  summonFromPath = (path, tiles) => {
    let sTypes = [];
    let pTypes = [];
    let parts = [];
    let players = [];
    let extraLines = 0;
    let tileIndex = 0;
    for (let k in path.lines) {
      let address = path.lines[k];
      tileIndex = address[0];
      let tile = tiles[tileIndex];
      if (tile.playerId != undefined) players.push(tile.playerId);
      let l = tile.lines[address[1]];
      if (l[2] == false) {
        extraLines++;
        continue;
      }
      let c = components[l[2]];
      sTypes.push(...c.s);
      pTypes.push(...c.p);
      parts.push(l[2]);
    }

    let bonus = Math.floor(extraLines / 3);
    for (let n = 0; n < Math.ceil(bonus / 2); n++) {
      sTypes.push('➰');
    }
    for (let n = 0; n < Math.floor(bonus / 2); n++) {
      pTypes.push('➰');
    }

    return {
      sTypes,
      pTypes,
      parts,
      players,
      structure: sTypes.length,
      power: pTypes.length,
      tileIndex,
    };
  };

  onkeypress = (e) => {
    e = e || window.event;
    if (e.keyCode == 32 && this.state.currentPiece != null) {
      // ROTATE
      this.setState((prev) => {
        return { currentPiece: RotatePiece(prev.currentPiece) };
      });
    } else if (e.keyCode == 27) {
      this.setState({ currentPiece: null, currentPieceIndex: null });
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
            noInteraction={true}
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
          currentPiece={this.state.currentPiece}
          pathData={this.state.pathData}
          placementPosition={
            cp == null
              ? { x: 0, y: 0 }
              : {
                  x: this.state.mouseX - cp.centerX,
                  y: this.state.mouseY - cp.centerY,
                }
          }
          summons={this.state.summons}
        />
        <Sidebar
          key={'sidebar' + this.state.sidebarUpdateToggle}
          pieces={this.state.sidebarPieces}
          select={this.select}
          selectedIndex={this.state.currentPieceIndex}
          updateToggle={this.state.sidebarUpdateToggle}
        />
        {heldTiles}
      </div>
    );
  }
}
