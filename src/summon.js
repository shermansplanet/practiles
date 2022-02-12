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
    this.state = {};
  }

  render() {
    let emoji = [];
    for (let i in this.props.data.parts) {
      let part = this.props.data.parts[i];
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
        style={{
          top: this.props.pos.y + POLYGON_TIP_RADIUS + 'px',
          left: this.props.pos.x + POLYGON_EDGE_RADIUS + 'px',
        }}
      >
        {emoji}
      </div>
    );
  }
}
