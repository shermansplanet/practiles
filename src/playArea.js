import React from 'react';

import { POLYGON_OFFSET, POLYGON_EDGE_RADIUS } from './consts';
import Tile from './tile';

export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedSpot: null };
  }

  trackMouse = (e) => {
    let y = Math.floor(e.clientY / POLYGON_OFFSET);
    let x = Math.floor((e.clientX / POLYGON_EDGE_RADIUS - y) / 2);
    this.setState({ selectedSpot: { x, y } });
  };

  click = (e) => {
    this.props.placePiece(this.state.selectedSpot);
  };

  render() {
    let tileData = this.props.tiles;
    let tiles = [];
    let selectedSpot = this.state.selectedSpot;

    for (var i in tileData) {
      let tile = tileData[i];
      let y = tile.y;
      let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
      y *= POLYGON_OFFSET;
      tiles.push(<Tile key={i} lines={tile.lines} x={x} y={y} />);
    }
    return (
      <div
        onMouseMove={this.trackMouse}
        onMouseDown={this.click}
        className="playArea"
      >
        {tiles}
      </div>
    );
  }
}
