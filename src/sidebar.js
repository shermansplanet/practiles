import React from 'react';

import { SIDEBAR_WIDTH, POLYGON_EDGE_RADIUS, POLYGON_OFFSET } from './consts';
import Tile from './tile';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: { x: 0, y: 0 }, highlightedPiece: null };
    this.updatePositions();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.updateToggle) !==
      JSON.stringify(prevProps.updateToggle)
    )
      this.updatePositions();
  }

  updatePositions = () => {
    let piecesToPlace = [0, 1, 2, 3];
    this.piecePositions = {};
    let occupiedSpots = {};
    const width = 4;
    let rightmost = 0;
    for (let spotIndex = 0; spotIndex < 48; spotIndex++) {
      let spotY = Math.floor(spotIndex / width);
      let spotX = (spotIndex % width) - Math.floor(spotY / 2);
      for (let pieceIndexIndex in piecesToPlace) {
        let pieceIndex = piecesToPlace[pieceIndexIndex];
        let piece = this.props.pieces[pieceIndex];
        let collision = false;
        let keys = {};
        for (let tile of piece.tiles) {
          let potentialSpot = { x: tile.x + spotX, y: tile.y + spotY };
          let key = potentialSpot.x + '-' + potentialSpot.y;
          keys[key] = true;
          let xOffset = Math.floor(potentialSpot.y / 2);
          if (
            potentialSpot.x < -xOffset ||
            potentialSpot.x >= width - xOffset ||
            potentialSpot.y < 0 ||
            key in occupiedSpots
          ) {
            collision = true;
            break;
          }
        }
        if (!collision) {
          occupiedSpots = { ...occupiedSpots, ...keys };
          piecesToPlace.splice(pieceIndexIndex, 1);
          let centerX = spotX + piece.centerX / (POLYGON_EDGE_RADIUS * 2);
          let centerY = spotY + piece.centerY / POLYGON_OFFSET;
          this.piecePositions[pieceIndex] = {
            x: spotX + centerX / 12,
            y: spotY + centerY / 12,
          };
          for (let tile of piece.tiles) {
            rightmost = Math.max(
              rightmost,
              spotX +
                tile.x +
                Math.floor((spotY + tile.y) / 2) +
                ((spotY + tile.y) % 2) * 0.5
            );
          }
          break;
        }
      }
      if (piecesToPlace.length == 0) break;
    }
    let nudge = (3.5 - rightmost) / 2;
    for (let i in this.piecePositions) {
      this.piecePositions[i].x += nudge;
    }
  };

  mouseover = (pieceIndex) => {
    this.setState({ highlightedPiece: pieceIndex });
  };

  render() {
    let pieces = [];

    for (let pieceIndex in this.props.pieces) {
      if (this.props.selectedIndex == pieceIndex) continue;
      const pi = pieceIndex;
      let piece = this.props.pieces[pieceIndex];
      let piecePos = this.piecePositions[pieceIndex];
      for (let i in piece.tiles) {
        let tile = piece.tiles[i];
        let y = tile.y + piecePos.y;
        let x = ((tile.x + piecePos.x) * 2 + y) * POLYGON_EDGE_RADIUS;
        y *= POLYGON_OFFSET;
        pieces.push(
          <Tile
            highlighted={this.state.highlightedPiece == pieceIndex}
            key={'sidebarPiece_' + pieceIndex + '-' + i}
            lines={tile.lines}
            x={x}
            y={y}
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
