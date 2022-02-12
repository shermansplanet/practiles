import { POLYGON_TIP_RADIUS, POLYGON_EDGE_RADIUS } from './consts';
import { pointstring } from './tileUtils';
import { components } from './components';
import React from 'react';
export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inspect: -1 };
  }

  render() {
    let linedata = this.props.lines;
    let lines = [];
    const bg = 'white';
    const fg = '#555';

    let infobox = null;

    for (let i = 0; i < 3; i++) {
      let i1 = linedata[i][0];
      let i2 = linedata[i][1];
      let lineColor = fg;
      let isLoop = false;

      if (this.props.pathData != undefined) {
        let key = this.props.index + '-' + i;
        let pathIndex = this.props.pathData.pathsByLine[key];
        isLoop = this.props.pathData.paths[pathIndex].loop;
        if (isLoop) {
          lineColor = '#f90';
        }
      }

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
          key={'outline_' + i}
          style={{ fill: 'none', stroke: bg, strokeWidth: 8 }}
          d={pathstring}
        />,
        <path
          key={'line_' + i}
          style={{ fill: 'none', stroke: lineColor, strokeWidth: 4 }}
          d={pathstring}
        />
      );

      if (!linedata[i][2]) continue;
      const ci = i;

      let linelen = Math.min(Math.abs(i1 - i2), 6 - Math.abs(i1 - i2));
      let lerp2 = linelen == 1 ? 0.45 : 0.25;
      let lerp3 = linelen == 1 ? 0.275 : 0.05;
      let cx =
        x1 * (1 - lerp2 - lerp3) + POLYGON_EDGE_RADIUS * lerp2 + x2 * lerp3;
      let cy =
        y1 * (1 - lerp2 - lerp3) + POLYGON_TIP_RADIUS * lerp2 + y2 * lerp3;
      lines.push(
        <circle
          onMouseEnter={() => this.setState({ inspect: ci })}
          onMouseLeave={() => this.setState({ inspect: -1 })}
          key={'circle_' + i}
          cx={cx}
          cy={cy}
          r="12"
          style={{
            fill: this.state.inspect == ci ? 'black' : bg,
            stroke: lineColor,
            zIndex: 1,
            strokeWidth: 2,
          }}
        />
      );

      if (this.state.inspect == ci) {
        let comp = components[linedata[i][2]];
        infobox = (
          <div
            className="infobox"
            style={{
              transform: `translate(${cx + this.props.x}px, ${
                cy + this.props.y
              }px)`,
            }}
          >
            {linedata[i][2]}
            <b>{comp.name}</b>
            {comp.p.length > 0 ? <div>Power: +{comp.p.join('')}</div> : null}
            {comp.s.length > 0 ? (
              <div>Structure: +{comp.s.join('')}</div>
            ) : null}
          </div>
        );
      }

      if (isLoop) continue;
      lines.push(
        <text
          key={'symbol_' + i}
          textAnchor="middle"
          x={cx}
          y={cy + 6.9}
          style={{ font: 'bold 18px sans-serif', pointerEvents: 'none' }}
        >
          {linedata[i][2]}
        </text>
      );
    }
    return (
      <div>
        <svg
          height={POLYGON_TIP_RADIUS * 2}
          width={POLYGON_EDGE_RADIUS * 2}
          onMouseEnter={this.props.mouseEnterCb}
          onClick={this.props.onClickCb}
          style={{
            pointerEvents: this.props.noInteraction ? 'none' : '',
            position: 'absolute',
            transform: `translate(${this.props.x}px, ${this.props.y}px)`,
            cursor: this.props.highlighted ? 'pointer' : 'default',
          }}
        >
          <polygon
            points={pointstring}
            style={{
              fill: bg,
              stroke: this.props.highlighted ? '#900' : '#ccc',
              strokeWidth: this.props.highlighted ? 4 : 2,
            }}
          />
          {lines}
        </svg>
        {infobox}
      </div>
    );
  }
}
