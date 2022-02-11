import React from 'react';
import { POLYGON_TIP_RADIUS, POLYGON_EDGE_RADIUS } from './consts';

import PlayArea from './playArea';
import Tile from './tile';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPiece: { ...this.randomTile(), x: -1000, y: -1000 },
      tiles: [{ ...this.randomTile(), x: 0, y: 0 }],
    };
  }

  onMove = (e) => {
    if (this.state.currentPiece == null) return;
    this.setState((prev) => {
      return {
        currentPiece: {
          ...prev.currentPiece,
          x: e.clientX - POLYGON_EDGE_RADIUS,
          y: e.clientY - POLYGON_TIP_RADIUS,
        },
      };
    });
  };

  placePiece = (spot) => {
    if (this.state.currentPiece == null) return;
    this.setState((prev) => {
      return {
        currentPiece: { ...this.randomTile(), x: -1000, y: -1000 },
        tiles: [...prev.tiles, { ...prev.currentPiece, x: spot.x, y: spot.y }],
      };
    });
  };

  onkeypress = (e) => {
    e = e || window.event;
    if (e.keyCode == 32) {
      // ROTATE
      this.setState((prev) => {
        let currentPiece = prev.currentPiece;
        for (let line of currentPiece.lines) {
          line[0] = (line[0] + 1) % 6;
          line[1] = (line[1] + 1) % 6;
        }
        return { currentPiece };
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

  randomTile = () => {
    const symbols = ['🔥', '💧', '🪨', '💨', '🌿', '⚙️', '☀️', '🌑', '🗝', '⛓'];
    let indices = [0, 1, 2, 3, 4, 5];
    let lines = [];
    for (let _ = 0; _ < 3; _++) {
      let line = [];
      for (let _ = 0; _ < 2; _++) {
        let randi = Math.floor(Math.random() * indices.length);
        line.push(indices[randi]);
        indices.splice(randi, 1);
      }
      line = [
        ...line,
        Math.random() > 0.25
          ? false
          : symbols[Math.floor(Math.random() * symbols.length)],
      ];
      lines.push(line);
    }
    return { lines };
  };

  render() {
    let heldTile = null;
    let cp = this.state.currentPiece;
    if (cp != null) {
      heldTile = <Tile key="heldTile" lines={cp.lines} x={cp.x} y={cp.y} />;
    }
    return (
      <div className="fullscreen" onMouseMove={this.onMove}>
        <PlayArea tiles={this.state.tiles} placePiece={this.placePiece} />
        {heldTile}
      </div>
    );
  }
}
