import { POLYGON_TIP_RADIUS, POLYGON_EDGE_RADIUS } from './consts';
import React from 'react';
export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let pointstring = '';
    let linedata = this.props.lines;
    let lines = [];
    const bg = 'white';
    const fg = 'black';

    for (let i = 0; i < 6; i++) {
      let a = ((i + 0.5) * Math.PI) / 3;
      let vertx = Math.cos(a) * POLYGON_TIP_RADIUS + POLYGON_EDGE_RADIUS;
      let verty = Math.sin(a) * POLYGON_TIP_RADIUS + POLYGON_TIP_RADIUS;
      let centerstring = vertx + ',' + verty + ' ';
      pointstring += centerstring;
    }

    for (let i = 0; i < 3; i++) {
      let i1 = linedata[i][0];
      let i2 = linedata[i][1];

      let a = (i1 * Math.PI) / 3;
      let x1 = Math.cos(a) * POLYGON_EDGE_RADIUS + POLYGON_EDGE_RADIUS;
      let y1 = Math.sin(a) * POLYGON_EDGE_RADIUS + POLYGON_TIP_RADIUS;

      a = (i2 * Math.PI) / 3;
      let x2 = Math.cos(a) * POLYGON_EDGE_RADIUS + POLYGON_EDGE_RADIUS;
      let y2 = Math.sin(a) * POLYGON_EDGE_RADIUS + POLYGON_TIP_RADIUS;

      const lerp = 0.4;
      let pathstring =
        `M${x1},${y1} ` +
        `C${POLYGON_EDGE_RADIUS * (1 - lerp) + x1 * lerp},${
          POLYGON_TIP_RADIUS * (1 - lerp) + y1 * lerp
        } ${POLYGON_EDGE_RADIUS * (1 - lerp) + x2 * lerp},${
          POLYGON_TIP_RADIUS * (1 - lerp) + y2 * lerp
        } ${x2},${y2}`;

      lines.push(
        // <path
        //   style={{ fill: 'none', stroke: bg, strokeWidth: 10 }}
        //   d={pathstring}
        // />,
        <path
          style={{ fill: 'none', stroke: fg, strokeWidth: 4 }}
          d={pathstring}
        />
      );
    }
    return (
      <svg height={POLYGON_TIP_RADIUS * 2} width={POLYGON_EDGE_RADIUS * 2}>
        <polygon
          points={pointstring}
          style={{ fill: bg, stroke: '#aaa', strokeWidth: 1 }}
        />
        {lines}
      </svg>
    );
  }
}
