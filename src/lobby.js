import React from 'react';
export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let link = window.location.href;
    if (!link.includes('?')) {
      link = link + '?game=' + this.props.game.id;
    }
    let players = this.props.game.players;
    let playerList = Object.keys(players);
    playerList.sort((a, b) => players[a] - players[b]);
    return (
      <div>
        <div>{playerList}</div>
        <a href={link}>{link}</a>
      </div>
    );
  }
}
