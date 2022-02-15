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
    playerList.sort(
      (a, b) => parseInt(players[a].order) - parseInt(players[b].order)
    );
    let playerDivs = [];
    for (let i in playerList) {
      const pid = playerList[i];
      playerDivs.push(
        <div>
          {pid}
          {players[pid].name || `Player ${parseInt(i) + 1}`}
          {pid == this.props.playerId ? (
            <button className="textButton">✎</button>
          ) : null}
        </div>
      );
    }
    return (
      <div>
        <div>{playerDivs}</div>
        <a href={link}>{link}</a>
      </div>
    );
  }
}
