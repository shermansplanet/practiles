import Lobby from './lobby';
import Game from './game';
import React from 'react';
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  remove,
} from 'firebase/database';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.closing = false;
    this.initialized = false;

    function getCookie(cname) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }

    let playerId = getCookie('playerId');
    let x = document.cookie;
    if (playerId == '') {
      playerId = this.randomString(8);
      document.cookie = 'playerId=' + playerId;
    }

    this.state = { playerId, error: null, loading: false, game: null };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('game')) {
      this.state.loading = true;
      this.subscribeToGame(urlParams.get('game'), playerId);
    }
    this.initialized = true;
  }

  randomString = (length) => {
    let s = '';
    for (let i = 0; i < length; i++) {
      s += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    }
    return s;
  };

  newGame = () => {
    const gameId = this.randomString(4);
    const dbRef = ref(getDatabase(), '/games/' + gameId);
    const game = { mode: 'lobby', id: gameId };
    set(dbRef, game).then(() =>
      this.subscribeToGame(gameId, this.state.playerId)
    );
  };

  subscribeToGame = async (gameId, playerId) => {
    const dbRef = ref(getDatabase(), '/games/' + gameId);
    onValue(dbRef, (snapshot) => {
      if (this.closing) return;
      if (snapshot.exists()) {
        let game = snapshot.val();
        if (
          game.mode == 'lobby' &&
          (game.players == undefined ||
            (game.players[playerId] == undefined &&
              Object.keys(game.players).length < 6))
        ) {
          set(child(dbRef, `players/${playerId}`), {
            order:
              game.players == undefined ? 0 : Object.keys(game.players).length,
          });

          window.onbeforeunload = () => {
            if (this.state.game.mode == 'lobby') {
              this.closing = true;
              remove(child(dbRef, `players/${playerId}`));
            }
            return null;
          };
        } else {
          if (this.initialized) {
            this.setState({ loading: false, game });
          } else {
            this.state.loading = false;
            this.state.game = game;
          }
        }
      } else {
        if (this.initialized) {
          this.setState({
            loading: false,
            error: "That game doesn't exist!",
          });
        } else {
          this.state.loading = false;
          this.state.error = "That game doesn't exist!";
        }
      }
    });
  };

  render() {
    if (this.state.loading) {
      return <div>LOADING...</div>;
    }
    if (this.state.error != null) {
      return <div>{this.state.error}</div>;
    }
    if (this.state.game == null) {
      return (
        <button className="bigButton" onClick={this.newGame}>
          NEW GAME
        </button>
      );
    }
    if (this.state.game.mode == 'lobby') {
      return <Lobby game={this.state.game} playerId={this.state.playerId} />;
    }
    return <Game game={this.state.game} playerId={this.state.playerId} />;
  }
}
