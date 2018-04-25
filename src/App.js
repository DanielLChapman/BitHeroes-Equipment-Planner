import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { sets } from './sets';
import { equipment } from './equipment';

class App extends Component {

  componentDidMount() {
    console.log(sets);
    console.log(equipment);

    let newObj = {};
    Object.keys(equipment).map( (x) => {
      newObj[equipment[x].partOfSet] = newObj[equipment[x].partOfSet] + 1 || 1 
    });

    let newObj2 = {};
    Object.keys(sets).map( (x) => {
      Object.keys(sets[x].items).map( (y) => {
        let t = sets[x].items[y];
        t = t.split(' ').join('_');
        t = t.split("'").join('');
        t = t.toLowerCase();
        if (equipment[t]) {
          newObj2[t] = 1;
        } else {
          newObj2[t] = 0;
        }
      })
    });


    console.log(newObj);
    console.log(newObj2);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
