import React from 'react';
import './style.css';
import './playAreaStyle.css';
import './sidebarStyle.css';

import Game from './game';

import { initializeApp } from 'firebase/app';

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

export default function App() {
  return <Game />;
}
