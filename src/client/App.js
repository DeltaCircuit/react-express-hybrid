import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div id='header'>
                    <div >
                        <img src='/static/logo.png' id='logo' />
                        <h1>React-Express Hybrid</h1>
                    </div>
                </div>
                <div className='content'>
                    <p>
                        Yaay! it worked!
                    </p>
                    <p>
                        Now that you've set up the necessary structure, why waiting? Start hacking!
                    </p>
                </div>
            </div>
        );
    }
}

export default App;
