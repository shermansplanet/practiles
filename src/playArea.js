import React from 'react';

import {
  POLYGON_OFFSET,
  POLYGON_TIP_RADIUS,
  POLYGON_EDGE_RADIUS,
  SIDEBAR_WIDTH,
  playerColors,
} from './consts';
import { directions, pointstring } from './tileUtils';
import Tile from './tile';
import Summon from './summon';

export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseDown: false, offset: { x: 0, y: 0 } };
  }

  click = (e) => {
    this.setState({ mouseDown: true });
    if (!this.canPlace()) return;
    this.props.placePiece(this.getBasePosition());
  };

  unclick = (e) => {
    this.setState({ mouseDown: false });
  };

  drag = (e) => {
    if (!this.state.mouseDown) return;
    if (e.movementX == 0 && e.movementY == 0) return;
    this.setState((prev) => {
      return {
        offset: {
          x: prev.offset.x + e.movementX / 2,
          y: prev.offset.y + e.movementY / 2,
        },
      };
    });
  };

  getBasePosition = () => {
    let y = Math.round(
      (this.props.placementPosition.y - this.state.offset.y) / POLYGON_OFFSET
    );
    let x = Math.round(
      ((this.props.placementPosition.x - this.state.offset.x) /
        POLYGON_EDGE_RADIUS -
        y) /
        2
    );
    return { x, y };
  };

  areaRef = (ref) => {
    this.setState({
      offset: {
        x: ref.offsetWidth / 2 - POLYGON_EDGE_RADIUS,
        y: ref.offsetHeight / 2 - POLYGON_TIP_RADIUS,
      },
    });
  };

  canPlace = () => {
    let cp = this.props.currentPiece;
    if (cp == null) return false;
    let tileData = this.props.tiles;
    let pos = this.getBasePosition();
    for (let tileToPlace of cp.tiles) {
      let x = pos.x + tileToPlace.x;
      let y = pos.y + tileToPlace.y;
      for (let tile of tileData) {
        if (tile.x == x && tile.y == y) {
          return false;
        }
      }
    }
    let hasNeighbor = false;
    for (let tileToPlace of cp.tiles) {
      for (let d of directions) {
        let x = pos.x + tileToPlace.x + d[0];
        let y = pos.y + tileToPlace.y + d[1];
        for (let tile of tileData) {
          if (tile.x == x && tile.y == y) {
            hasNeighbor = true;
            break;
          }
        }
        if (hasNeighbor) break;
      }
      if (hasNeighbor) break;
    }
    return hasNeighbor;
  };

  render() {
    let tileData = this.props.tiles;
    let tiles = [];

    let shadow = [];
    let canPlace = this.canPlace();
    if (canPlace) {
      let cp = this.props.currentPiece;
      let pos = this.getBasePosition();
      for (let i in cp.tiles) {
        let tileToPlace = cp.tiles[i];
        let x = pos.x + tileToPlace.x;
        let y = pos.y + tileToPlace.y;
        x = (x * 2 + y) * POLYGON_EDGE_RADIUS;
        y *= POLYGON_OFFSET;
        x += this.state.offset.x;
        y += this.state.offset.y;
        shadow.push(
          <svg
            key={'shadow' + i}
            height={POLYGON_TIP_RADIUS * 2}
            width={POLYGON_EDGE_RADIUS * 2}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <polygon
              points={pointstring}
              style={{
                fill: '#fff2',
                stroke: 'none',
              }}
            />
          </svg>
        );
      }
    }

    let tilePositions = [];

    let highlightedLines = [];
    for (var i in tileData) {
      highlightedLines.push([false, false, false]);
    }
    if (this.props.activeSummon != null) {
      let highlightColor = this.props.activeSummon.highlightColor;
      let summonPath =
        this.props.pathData.pathsById[this.props.activeSummon.pathId];
      for (let pathId of summonPath.connectedPaths) {
        let lines = this.props.pathData.pathsById[pathId].lines;
        for (let lineKey in lines) {
          let line = lines[lineKey];
          highlightedLines[line[0]][line[1]] = highlightColor;
        }
      }
    }

    for (var i in tileData) {
      let tile = tileData[i];
      let y = tile.y;
      let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
      y *= POLYGON_OFFSET;
      x += this.state.offset.x;
      y += this.state.offset.y;
      tiles.push(
        <Tile
          key={'tile_' + i}
          lines={tile.lines}
          color={tile.color}
          x={x}
          y={y}
          index={i}
          pathData={this.props.pathData}
          highlightedLines={highlightedLines[i]}
        />
      );
      tilePositions.push({ x, y });
    }

    let summons = [];
    for (let i in this.props.summons) {
      let summon = this.props.summons[i];
      let pos = tilePositions[summon.tileIndex];
      summons.push(
        <Summon
          key={'summon_' + i + JSON.stringify(pos)}
          data={summon}
          pos={pos}
          highlight={summon == this.props.activeSummon}
        />
      );
    }

    const summonOptions = [];
    for (let i in this.props.summonOptions || []) {
      let o = this.props.summonOptions[i];
      let x = tilePositions[o.tile].x + POLYGON_EDGE_RADIUS;
      let y = tilePositions[o.tile].y + POLYGON_TIP_RADIUS;
      let angle = 0;
      if (o.type != 'move') {
        let dir = directions[o.direction];
        angle = (o.direction * Math.PI) / 3;
        y += (dir[1] * POLYGON_OFFSET) / 2;
        x += (dir[0] + dir[1] / 2) * POLYGON_EDGE_RADIUS;
      }
      let style = { fontSize: '12pt', transform: `rotate(${angle}rad)` };
      let parentStyle = {
        left: x + 'px',
        top: y + 'px',
        animationDelay: '-' + i / 10 + 's',
      };
      if (o.type == 'attackplayer') {
        let col = playerColors[o.target];
        parentStyle.borderColor = col[2];
        style.color = col[2];
      }
      summonOptions.push(
        <button
          onClick={() => {
            this.props.takeOption(o);
          }}
          style={parentStyle}
          key={
            'option_' +
            i +
            '_' +
            this.props.activeSummon +
            tilePositions[o.tile].x +
            tilePositions[o.tile].y
          }
          className="summonOption"
        >
          <div style={style}>{o.type == 'move' ? '★' : '➤'}</div>
        </button>
      );
    }

    return (
      <div
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          zIndex: '-100',
        }}
      >
        <div
          onMouseDown={this.click}
          onMouseUp={this.unclick}
          onMouseLeave={this.unclick}
          onMouseMove={this.drag}
          className="playArea"
          style={{
            right: SIDEBAR_WIDTH,
            cursor: canPlace
              ? 'default'
              : this.state.mouseDown
              ? 'grabbing'
              : 'grab',
          }}
          ref={this.areaRef}
        />
        {shadow}
        {tiles}
        {summonOptions}
        {summons}
      </div>
    );
  }
}
