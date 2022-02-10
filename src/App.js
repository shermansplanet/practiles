import React from 'react';
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
  return (
    <div>
      <Tile
        lines={[
          [0, 2, true],
          [1, 3, true],
          [4, 5, true],
        ]}
      />
      <Tile
        lines={[
          [0, 3, true],
          [1, 5, true],
          [2, 4, true],
        ]}
      />
    </div>
  );
}
