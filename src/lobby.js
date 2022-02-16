import React from 'react';
import { getDatabase, set, ref } from 'firebase/database';
import { playerColors } from './consts';
import DirectionIndicator from './directionIndicator';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, name: '', hasCopied: false };
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
        <div
          key={'playerList_' + i}
          className="playerListElement"
          style={
            i < playerColors.length
              ? {
                  backgroundColor: playerColors[i][0],
                  borderColor: playerColors[i][1],
                }
              : null
          }
        >
          {pid == this.props.playerId && this.state.editing ? (
            <input
              ref={(ref) => {
                if (ref && ref.focus) ref.focus();
              }}
              value={this.state.name}
              onChange={(e) =>
                this.setState({ name: e.target.value.substring(0, 20) })
              }
            />
          ) : (
            players[pid].name || `Player ${parseInt(i) + 1}`
          )}
          {pid == this.props.playerId ? (
            <button
              className="textButton"
              onClick={() => {
                if (this.state.editing) {
                  const gameId = this.props.game.id;
                  const dbRef = ref(
                    getDatabase(),
                    '/games/' +
                      gameId +
                      '/players/' +
                      this.props.playerId +
                      '/name'
                  );
                  set(dbRef, this.state.name);
                }
                this.setState((prev) => {
                  return { editing: !prev.editing };
                });
              }}
            >
              {this.state.editing ? '✓' : '✎'}
            </button>
          ) : null}
        </div>
      );
    }

    function fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    }

    return (
      <div>
        <div className="playerList">{playerDivs}</div>
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
          <DirectionIndicator
            playerCount={Object.keys(this.props.game.players).length}
          />
          <div style={{ width: '300px', margin: '8px' }}>
            <b>Player positions </b> (the direction an Other will have to attack
            off the edge of the board to hit a player directly)
          </div>
        </div>
        <div>
          Game Link:
          <a style={{ margin: '6px' }} href={link}>
            {link}
          </a>
          <button
            onClick={() => {
              fallbackCopyTextToClipboard(link);
              this.setState({ hasCopied: true });
            }}
          >
            {this.state.hasCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    );
  }
}
