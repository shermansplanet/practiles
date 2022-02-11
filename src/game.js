import React from 'react';
import { POLYGON_OFFSET, POLYGON_EDGE_RADIUS } from './consts';

import PlayArea from './playArea';
import Tile from './tile';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPiece: this.randomTile(),
      tiles: [{ ...this.randomTile(), x: 0, y: 0 }],
    };
  }

  onMove = (e) => {
    if (this.state.currentPiece == null) return;
    let cp = this.state.currentPiece;
  };

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
      heldTile = <Tile lines={cp.lines} x={cp.x} y={cp.y} />;
    }
    return (
      <div className="fullscreen" onMouseMove={this.onMove}>
        <PlayArea tiles={this.state.tiles} />
        {heldTile}
      </div>
    );
  }
}
