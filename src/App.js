import React from 'react';
import logo from './assets/chicken.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          When I was a little girl, Grover Cleveland was president.
        </p>        
      </header>
    </div>
  );
}

export default App;
