import React from 'react';
import './App.css';
import image from '../../public/logo.png';

const App = () => (
  <div className="App">
    <div id="header">
      <div>
        <img src={image} id="logo" alt="logo" />
        <h1>React-Express Hybrid</h1>
      </div>
    </div>
    <div className="content">
      <p>
        Yaay! it worked!
                    </p>
      <p>Now that you have set up the necessary structure, why waiting? Start hacking!</p>
    </div>
  </div>
);

export default App;
