import React from 'react';
import { pointstring } from './tileUtils';

import {
  colorMapping,
  playerColors,
  POLYGON_TIP_RADIUS,
  POLYGON_EDGE_RADIUS,
} from './consts';

export default class DirectionIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let colorTris = [];
    let colorIndices = colorMapping[this.props.playerCount];
    for (let i = 0; i < 6; i++) {
      if (colorIndices[i] == null) continue;
      let a = ((i - 0.5) * Math.PI) / 3;
      let vertx = Math.cos(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_EDGE_RADIUS;
      let verty = Math.sin(a) * (POLYGON_TIP_RADIUS - 1) + POLYGON_TIP_RADIUS;

      let a2 = ((i + 0.5) * Math.PI) / 3;
      let vertx2 =
        Math.cos(a2) * (POLYGON_TIP_RADIUS - 1) + POLYGON_EDGE_RADIUS;
      let verty2 = Math.sin(a2) * (POLYGON_TIP_RADIUS - 1) + POLYGON_TIP_RADIUS;

      colorTris.push(
        <polygon
          key={'poly' + i}
          points={`${vertx},${verty} ${vertx2},${verty2} ${POLYGON_EDGE_RADIUS},${POLYGON_TIP_RADIUS}`}
          style={{
            fill: playerColors[colorIndices[i]][0],
            stroke: 'none',
          }}
        />
      );
    }

    return (
      <div>
        <svg height={POLYGON_TIP_RADIUS * 2} width={POLYGON_EDGE_RADIUS * 2}>
          {colorTris}
          <polygon
            points={pointstring}
            style={{
              fill: 'none',
              stroke: 'black',
              strokeWidth: 2,
            }}
          />
        </svg>
      </div>
    );
  }
}
