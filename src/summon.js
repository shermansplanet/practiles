import {
  POLYGON_OFFSET,
  POLYGON_TIP_RADIUS,
  POLYGON_EDGE_RADIUS,
  SIDEBAR_WIDTH,
} from './consts';

import React from 'react';

export default class Summon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    let emoji = [];
    let data = this.props.data;
    for (let i in data.parts) {
      let part = data.parts[i];
      let scale = 8 / (4 + parseInt(i));
      emoji.push(
        <div
          key={'summonEmoji_' + i}
          className="summonEmoji"
          style={{ transform: `scale(${scale})` }}
        >
          {part}
        </div>
      );
    }

    return (
      <div
        className="summon"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        style={{
          top: this.props.pos.y + POLYGON_TIP_RADIUS + 'px',
          left: this.props.pos.x + POLYGON_EDGE_RADIUS + 'px',
          borderColor: data.color,
        }}
      >
        {emoji}
        <div
          className="summonDetails"
          style={{ opacity: this.state.hover ? 1 : 0 }}
        >
          <b>{data.name}</b>
          {data.parts ? <div>{data.parts.join('')}</div> : <br />}
          {data.power} Power ({(data.pTypes || []).join('')})<br />
          {data.structure} Structure ({(data.sTypes || []).join('')})
        </div>
      </div>
    );
  }
}
