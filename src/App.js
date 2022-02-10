import React from 'react';
import { POLYGON_OFFSET, POLYGON_EDGE_RADIUS } from './consts';
import './style.css';
import Tile from './tile';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBaO_U5bGJbdxprRhGuiifxP8GZTBA4Avc',
  authDomain: 'practiles.firebaseapp.com',
  databaseURL: 'https://practiles-default-rtdb.firebaseio.com',
  projectId: 'practiles',
  storageBucket: 'practiles.appspot.com',
  messagingSenderId: '351914796197',
  appId: '1:351914796197:web:61714e3cde8e22ee43594c',
};
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dbref = ref(db, '/');
onValue(dbref, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

export default function App() {
  let tiles = [];
  const n = 5;
  const symbols = ['🔥', '💧', '🪨', '💨', '🌱', '⚙️'];
  for (let i = 0; i < n * n; i++) {
    let indices = [0, 1, 2, 3, 4, 5];
    let lines = [];
    for (let _ = 0; _ < 3; _++) {
      let line = [];
      for (let _ = 0; _ < 2; _++) {
        let randi = Math.floor(Math.random() * indices.length);
        line.push(indices[randi]);
        indices.splice(randi, 1);
      }
      line = [
        ...line,
        Math.random() > 0.25
          ? false
          : symbols[Math.floor(Math.random() * symbols.length)],
      ];
      lines.push(line);
    }
    let y = Math.floor(i / n);
    let x = ((i % n) * 2 + (y % 2)) * POLYGON_EDGE_RADIUS;
    y *= POLYGON_OFFSET;
    tiles.push(<Tile key={i} lines={lines} x={x} y={y} />);
  }
  return <div>{tiles}</div>;
}
