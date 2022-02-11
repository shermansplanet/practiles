import React from 'react';

import { SIDEBAR_WIDTH, POLYGON_EDGE_RADIUS, POLYGON_OFFSET } from './consts';
import Tile from './tile';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: { x: 0, y: 0 }, highlightedPiece: null };
  }

  mouseover = (pieceIndex) => {
    this.setState({ highlightedPiece: pieceIndex });
  };

  render() {
    const piecePositions = [
      { x: POLYGON_EDGE_RADIUS * 2.5 + 10, y: POLYGON_OFFSET * 5.5 },
      { x: POLYGON_EDGE_RADIUS * 10, y: POLYGON_OFFSET * 1.3 },
      { x: POLYGON_EDGE_RADIUS * 9, y: POLYGON_OFFSET * 5 },
      { x: POLYGON_EDGE_RADIUS * 4 + 10, y: POLYGON_OFFSET * 2.4 },
    ];
    let pieces = [];
    for (let pieceIndex in this.props.pieces) {
      if (this.props.selectedIndex == pieceIndex) continue;
      const pi = pieceIndex;
      let piece = this.props.pieces[pieceIndex];
      let piecePos = piecePositions[pieceIndex];
      for (let i in piece.tiles) {
        let tile = piece.tiles[i];
        let y = tile.y;
        let x = (tile.x * 2 + y) * POLYGON_EDGE_RADIUS;
        y *= POLYGON_OFFSET;
        pieces.push(
          <Tile
            highlighted={this.state.highlightedPiece == pieceIndex}
            key={'sidebarPiece_' + pieceIndex + '-' + i}
            lines={tile.lines}
            x={x + piecePos.x - piece.centerX}
            y={y + piecePos.y - piece.centerY}
            mouseEnterCb={() => this.mouseover(pi)}
            onClickCb={() => this.props.select(pi)}
          />
        );
      }
    }
    return (
      <div className="sidebar" style={{ width: SIDEBAR_WIDTH }}>
        <div
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onMouseEnter={() => this.mouseover(null)}
          onMouseDown={() => this.props.select(null)}
        />
        {pieces}
      </div>
    );
  }
}
