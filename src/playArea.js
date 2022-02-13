import React from 'react';

import {
  POLYGON_OFFSET,
  POLYGON_TIP_RADIUS,
  POLYGON_EDGE_RADIUS,
  SIDEBAR_WIDTH,
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
          x: prev.offset.x + e.movementX,
          y: prev.offset.y + e.movementY,
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
              //transitionDuration: '0.1s',
            }}
          >
            <polygon
              points={pointstring}
              style={{
                fill: '#0002',
                stroke: 'none',
              }}
            />
          </svg>
        );
      }
    }

    let tilePositions = [];

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
        />
      );
    }

    return (
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
      >
        {shadow}
        {tiles}
        {summons}
      </div>
    );
  }
}
