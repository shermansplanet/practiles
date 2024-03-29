import React from 'react';
import { POLYGON_OFFSET, POLYGON_EDGE_RADIUS, colorMapping } from './consts';

import { directions, GetPaths, GetRandomPiece, RotatePiece } from './tileUtils';

import { getDatabase, ref, set } from 'firebase/database';

import { components, GetName } from './components';

import PlayArea from './playArea';
import Sidebar from './sidebar';
import Tile from './tile';
import DirectionIndicator from './directionIndicator';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarUpdateToggle: false,
      currentPiece: null,
      currentPieceIndex: null,
      mouseX: 0,
      mouseY: 0,
    };
  }

  onMove = (e) => {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  select = (pieceIndex) => {
    let thisPlayer = this.props.game.players[this.props.playerId];
    let sidebarPieces = thisPlayer.sidebarPieces;

    this.setState({
      currentPieceIndex: parseInt(pieceIndex),
      currentPiece:
        pieceIndex == null
          ? null
          : JSON.parse(JSON.stringify(sidebarPieces[pieceIndex])),
    });
  };

  placePiece = (spot) => {
    if (this.state.currentPiece == null) return;

    let newtiles = [...this.props.game.tiles];
    for (let tile of this.state.currentPiece.tiles) {
      let neighbors = [];
      for (let side = 0; side < 6; side++) {
        let dir = directions[side];
        let targetX = spot.x + tile.x + dir[0];
        let targetY = spot.y + tile.y + dir[1];
        let connected = -1;
        for (let i in newtiles) {
          let otherTile = newtiles[i];
          if (otherTile.x != targetX || otherTile.y != targetY) continue;
          connected = i;
          otherTile.neighbors[(side + 3) % 6] = newtiles.length;
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
      newtiles.push(newPiece);
    }

    let thisPlayer = this.props.game.players[this.props.playerId];
    let sidebarPieces = thisPlayer.sidebarPieces;
    sidebarPieces[this.state.currentPieceIndex] = GetRandomPiece(
      this.state.currentPieceIndex + 1,
      this.props.playerId,
      thisPlayer.darkColor
    );

    let pathData = GetPaths(newtiles);
    let summons = this.props.game.summons || [];
    for (let pathId in pathData.pathsById) {
      let path = pathData.pathsById[pathId];
      if (
        path.loop &&
        (!(pathId in this.props.game.pathData.pathsById) ||
          !this.props.game.pathData.pathsById[pathId].loop)
      ) {
        summons.push(this.summonFromPath(path, newtiles));
      }
    }

    let currentPlayerIndex =
      (this.props.game.currentPlayerIndex + 1) %
      this.props.game.playerOrder.length;
    let phase =
      currentPlayerIndex == 0 && summons.length > 0 ? 'command' : 'place';

    let summonOptions = [];

    if (phase == 'command') {
      for (let summon of summons) {
        summon.controller =
          summon.players[Math.floor(Math.random() * summon.players.length)];
        let p = this.props.game.players[summon.controller];
        summon.color = p.color;
        summon.highlightColor = p.brightColor;
      }

      for (let pathId in pathData.pathsById) {
        let path = pathData.pathsById[pathId];
        if (!path.loop) continue;

        let connectedPaths = [pathId];
        for (let lineKey in path.lines) {
          let line = path.lines[lineKey];
          let tile = newtiles[line[0]];

          let thisLine = tile.lines[line[1]];
          let min = Math.min(thisLine[0], thisLine[1]);
          let max = Math.max(thisLine[0], thisLine[1]);
          let dist = max - min;
          if (dist == 1 || dist == 5) continue;

          for (let i = 0; i < 3; i++) {
            if (i == line[1]) continue;
            let otherLine = tile.lines[i];
            if (
              (otherLine[0] < max && otherLine[0] > min) ==
              (otherLine[1] < max && otherLine[1] > min)
            )
              continue;

            let pathKey = line[0] + '-' + i;
            let id = pathData.paths[pathData.pathsByLine[pathKey]].id;
            if (connectedPaths.includes(id)) continue;
            connectedPaths.push(id);
          }
        }
        path.connectedPaths = connectedPaths;
      }

      summonOptions = this.getSummonOptions(summons, newtiles, pathData, 0);
    }

    const dbRef = ref(getDatabase(), '/games/' + this.props.game.id);
    set(dbRef, {
      ...this.props.game,
      pathData,
      tiles: newtiles,
      summons,
      phase,
      summonOptions,
      currentPlayerIndex,
      currentSummonIndex: 0,
    });

    this.setState({
      currentPiece: null,
      currentPieceIndex: null,
      sidebarUpdateToggle: !this.state.sidebarUpdateToggle,
    });
  };

  getSummonOptions(summons, newtiles, pathData, currentSummonIndex) {
    let moveTiles = {};
    let options = [];
    let summon = summons[currentSummonIndex];
    let mapping = colorMapping[this.props.game.playerOrder.length];
    for (let pathId of pathData.pathsById[summon.pathId].connectedPaths) {
      let lines = pathData.pathsById[pathId].lines;
      for (let i in lines) {
        moveTiles[lines[i][0]] = true;

        let tile = newtiles[lines[i][0]];
        let line = tile.lines[lines[i][1]];
        for (let ii = 0; ii < 2; ii++) {
          let direction = line[ii];
          if (tile.neighbors[direction] != -1) continue;
          let target = mapping[direction];
          if (target == null) continue;
          options.push({
            type: 'attackplayer',
            tile: lines[i][0],
            direction,
            target,
          });
        }
      }
    }

    let summonsByTile = {};
    for (let si in summons) {
      summonsByTile[summons[si].tileIndex] = si;
    }

    for (let tileIndex of Object.keys(moveTiles)) {
      if (
        tileIndex in summonsByTile &&
        summonsByTile[tileIndex] != currentSummonIndex
      )
        continue;
      if (!(tileIndex in summonsByTile)) {
        options.push({ type: 'move', tile: tileIndex });
      }
      let tile = newtiles[tileIndex];
      for (let i in tile.neighbors) {
        let neighbor = tile.neighbors[i];
        if (neighbor == -1) {
          continue;
        }
        if (
          neighbor in summonsByTile &&
          summonsByTile[neighbor] != currentSummonIndex
        ) {
          options.push({
            type: 'attack',
            tile: tileIndex,
            direction: i,
            target: summonsByTile[neighbor],
          });
        }
      }
    }
    return options;
  }

  takeOption = (option) => {
    let summons = this.props.game.summons;
    let summon = summons[this.props.game.currentSummonIndex];
    summon.tileIndex = option.tile;

    let currentSummonIndex =
      (this.props.game.currentSummonIndex + 1) % summons.length;
    let phase = currentSummonIndex == 0 ? 'place' : 'command';

    let summonOptions = this.getSummonOptions(
      summons,
      this.props.game.tiles,
      this.props.game.pathData,
      currentSummonIndex
    );

    const dbRef = ref(getDatabase(), '/games/' + this.props.game.id);
    set(dbRef, {
      ...this.props.game,
      summons,
      phase,
      summonOptions,
      currentPlayerIndex: 0,
      currentSummonIndex,
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

    let summon = {
      sTypes,
      pTypes,
      parts,
      players,
      structure: sTypes.length,
      power: pTypes.length,
      tileIndex,
      pathId: path.id,
    };

    summon.name = GetName(summon);

    return summon;
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
            color={tile.color}
            x={x + this.state.mouseX - cp.centerX}
            y={y + this.state.mouseY - cp.centerY}
          />
        );
      }
    }

    let thisPlayer = this.props.game.players[this.props.playerId];
    let sidebarPieces = thisPlayer == undefined ? [] : thisPlayer.sidebarPieces;
    let activeSummon =
      this.props.game.phase == 'place'
        ? null
        : this.props.game.summons[this.props.game.currentSummonIndex];

    return (
      <div className="fullscreen" onMouseMove={this.onMove}>
        <PlayArea
          takeOption={this.takeOption}
          tiles={this.props.game.tiles}
          placePiece={this.placePiece}
          currentPiece={this.state.currentPiece}
          pathData={this.props.game.pathData}
          summonOptions={
            activeSummon && activeSummon.controller == this.props.playerId
              ? this.props.game.summonOptions
              : null
          }
          placementPosition={
            cp == null
              ? { x: 0, y: 0 }
              : {
                  x: this.state.mouseX - cp.centerX,
                  y: this.state.mouseY - cp.centerY,
                }
          }
          summons={this.props.game.summons}
          players={this.props.game.players}
          gameId={this.props.game.id}
          activeSummon={activeSummon}
        />
        <Sidebar
          active={
            this.props.game.phase == 'place' &&
            this.props.game.playerOrder[this.props.game.currentPlayerIndex] ==
              this.props.playerId
          }
          key={'sidebar' + this.state.sidebarUpdateToggle}
          pieces={sidebarPieces}
          select={this.select}
          selectedIndex={this.state.currentPieceIndex}
          updateToggle={this.state.sidebarUpdateToggle}
        />
        {heldTiles}
        <DirectionIndicator playerCount={this.props.game.playerOrder.length} />
        <div
          style={{
            zIndex: 100,
            display: 'flex',
            width: '500px',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            pointerEvents: 'none',
          }}
        >
          {this.props.game.phase == 'place'
            ? this.props.game.playerOrder.map((val, i) => {
                let player = this.props.game.players[val];
                let selected = this.props.game.currentPlayerIndex == i;
                // this.props.game.phase == 'place'
                //   ? this.props.game.currentPlayerIndex == i
                //   : this.props.game.summons[this.props.game.currentSummonIndex]
                //       .controller == val;
                return (
                  <div
                    key={'playerList_' + i}
                    className="playerListElement"
                    style={{
                      backgroundColor: player.color,
                      color: player.darkColor,
                      borderColor: selected
                        ? player.brightColor
                        : player.darkColor,
                      boxShadow: selected
                        ? '0 0 20px 0 ' + player.brightColor
                        : null,
                    }}
                  >
                    {this.props.game.players[val].name}
                  </div>
                );
              })
            : this.props.game.summons.map((val, i) => {
                let player = this.props.game.players[val.controller];
                let selected = this.props.game.currentSummonIndex == i;
                return (
                  <div
                    key={'playerList_' + i}
                    className="playerListElement"
                    style={{
                      backgroundColor: player.color,
                      color: player.darkColor,
                      opacity: selected ? 1 : 0.5,
                      borderColor: selected
                        ? player.brightColor
                        : player.darkColor,
                      boxShadow: selected
                        ? '0 0 20px 0 ' + player.brightColor
                        : null,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <b style={{ fontSize: '12pt' }}>{val.name}</b>
                    <i style={{ fontSize: '10pt' }}>{player.name}</i>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
