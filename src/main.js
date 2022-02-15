import Lobby from './lobby';
import React from 'react';
import { getDatabase, ref, onValue, get, push } from 'firebase/database';
export default class Main extends React.Component {
  constructor(props) {
    super(props);

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
    if (playerId == '') {
      playerId = this.randomString(8);
      document.cookie = 'playerId=' + playerId;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('game')) {
      const gameId = urlParams.get('game');
      const db = getDatabase();
      const dbref = ref(db, '/games/' + gameId);

      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            this.setState({ error: "That game doesn't exist!" });
          }
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      this.state = { error: null };
    }
  }

  randomString = (length) => {
    let s = '';
    for (let i = 0; i < length; i++) {
      s += String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    }
    return s;
  };

  render() {
    if (this.state.error != null) {
      return <div>{this.state.error}</div>;
    }
    return <div />;
  }
}
