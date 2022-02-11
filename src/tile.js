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
    const fg = '#555';

    for (let i = 0; i < 6; i++) {
      let a = ((i + 0.5) * Math.PI) / 3;
      let vertx = Math.cos(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_EDGE_RADIUS;
      let verty = Math.sin(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_TIP_RADIUS;
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
        <path
          style={{ fill: 'none', stroke: bg, strokeWidth: 8 }}
          d={pathstring}
        />,
        <path
          style={{ fill: 'none', stroke: fg, strokeWidth: 4 }}
          d={pathstring}
        />
      );

      if (!linedata[i][2]) continue;

      let linelen = Math.min(Math.abs(i1 - i2), 6 - Math.abs(i1 - i2));
      let lerp2 = linelen == 1 ? 0.45 : 0.25;
      let lerp3 = linelen == 1 ? 0.275 : 0.05;
      let cx =
        x1 * (1 - lerp2 - lerp3) + POLYGON_EDGE_RADIUS * lerp2 + x2 * lerp3;
      let cy =
        y1 * (1 - lerp2 - lerp3) + POLYGON_TIP_RADIUS * lerp2 + y2 * lerp3;
      lines.push(
        <circle
          cx={cx}
          cy={cy}
          r="12"
          style={{ fill: bg, stroke: fg, strokeWidth: 2 }}
        />
      );

      lines.push(
        <text
          text-anchor="middle"
          x={cx}
          y={cy + 6.9}
          style={{ font: 'bold 18px sans-serif' }}
        >
          {linedata[i][2]}
        </text>
      );
    }
    return (
      <svg
        height={POLYGON_TIP_RADIUS * 2}
        width={POLYGON_EDGE_RADIUS * 2}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          transform: `translate(${this.props.x}px, ${this.props.y}px)`,
        }}
      >
        <polygon
          points={pointstring}
          style={{
            fill: bg,
            stroke: '#ccc',
            strokeWidth: 2,
          }}
        />
        {lines}
      </svg>
    );
  }
}
