import React, { useState, useEffect } from 'react';
import logo from './assets/chicken.png';
import './App.css';

function App() {
  useEffect(() => {
    console.log('App useEffect fired!');
    let delay = 0;
    [...document.getElementsByClassName('title-piece')].map((titlePiece, i) => {
      setTimeout(() => {
        titlePiece.classList.remove('hidden')
      }, 300 * i);
    });
    setTimeout(() => {
      document.getElementById('hamburger').classList.remove('hidden')
    }, 800);
  });
  return (
    <div className='App'>
      <header>
        <div id='title'>
          <div className='title-piece hidden'>Wagsworth</div>
          <div className='title-piece hidden'>Grooming</div>
        </div>
        <div id='hamburger' className='hidden' />
      </header>
      <div className='App-body'>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='pulsing-text'>When I was a little girl, Grover Cleveland was president.</div>
      </div>
    </div>
  );
}

export default App;
