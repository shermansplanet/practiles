import { POLYGON_RADIUS } from './consts';
import React from 'react';
export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let pointstring = '';
    for (let i = 0.5; i < 6; i++) {
      let a = (i * Math.PI) / 3;
      pointstring +=
        (Math.cos(a) * POLYGON_RADIUS + POLYGON_RADIUS).toString() +
        ',' +
        (Math.sin(a) * POLYGON_RADIUS + POLYGON_RADIUS).toString() +
        ' ';
    }
    return (
      <svg height={POLYGON_RADIUS * 2} width={POLYGON_RADIUS * 2}>
        <polygon
          points={pointstring}
          style={{ fill: 'lime', stroke: 'purple', strokeWidth: 1 }}
        />
      </svg>
    );
  }
}
