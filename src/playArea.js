import React from 'react';

import {
  POLYGON_OFFSET,
  POLYGON_TIP_RADIUS,
  POLYGON_EDGE_RADIUS,
} from './consts';
import Tile from './tile';

export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: { x: 0, y: 0 } };
  }
  click = (e) => {
    let y = Math.floor((e.clientY - this.state.offset.y) / POLYGON_OFFSET);
    let x = Math.floor(
      ((e.clientX - this.state.offset.x) / POLYGON_EDGE_RADIUS - y) / 2
    );
    this.props.placePiece({ x, y });
  };

  areaRef = (ref) => {
    this.setState({
      offset: {
        x: ref.offsetWidth / 2 - POLYGON_EDGE_RADIUS,
        y: ref.offsetHeight / 2 - POLYGON_TIP_RADIUS,
      },
    });
  };

  render() {
    let tileData = this.props.tiles;
    let tiles = [];

    for (var i in tileData) {
      let tile = tileData[i];
      let y = tile.y;
      let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
      y *= POLYGON_OFFSET;
      x += this.state.offset.x;
      y += this.state.offset.y;
      tiles.push(
        <Tile
          key={i}
          lines={tile.lines}
          x={x}
          y={y}
          index={i}
          pathData={this.props.pathData}
        />
      );
    }
    return (
      <div onMouseDown={this.click} className="playArea" ref={this.areaRef}>
        {tiles}
      </div>
    );
  }
}
