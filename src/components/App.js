import React, { Component } from 'react';

import { sets } from '../sets';
import { equipment } from '../equipment';

import Equipment from './Equipment';
import Equipped from './Equipped';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      equipped: {
        mainhand: {},
        offhand: {},
        body: {},
        head: {},
        ring: {},
        necklace: {},
        pet: {},
        accessory: {}
      },
      sets,
      equipment,
      mythics: {},
      sortedEquipment: {
        mainhands: {},
        offhands: {},
        bodies: {},
        heads: {},
        rings: {},
        necklaces: {},
        pets: {},
        accessories: {}
      }
    }
  }

  componentDidMount () {
    var mainhands = {}, offhands = {}, 
    bodies = {}, heads = {}, rings = {}, 
    necklaces = {}, pets = {}, accessories = {}, mythics = {};
    Object.keys(equipment).forEach( (x) => {
      if (equipment[x].type === "mythic") {
        mythics[x] = equipment[x];
      }
      switch(equipment[x].slot) {
        case 'Offhand':
          offhands[x] = equipment[x];
          break;
        case 'Body':
          bodies[x] = equipment[x];
          break;
        case 'Head':
          heads[x] = equipment[x];
          break;
        case 'Ring':
          rings[x] = equipment[x];
          break;
        case 'Necklace':
          necklaces[x] = equipment[x];
          break;
        case 'Pet':
          pets[x] = equipment[x];
          break;
        case 'Accessory':
          accessories[x] = equipment[x];
          break;
        default: 
          mainhands[x] = equipment[x];
      };
    });

    Object.keys(sets).forEach( (x) => {
      Object.keys(sets[x].items).forEach( (y) => {
        let t = sets[x].items[y];
        if (typeof t === "object") {
          t = t.name;
        }
        if (typeof t === "undefined") {
          t = "Phantom Light";
        }
        t = t.split(" ").join('_');
        t = t.split("'").join('');
        t = t.toLowerCase();
        sets[x].items[y] = equipment[t]
      })
    });

    this.setState({
      sets,
      mythics,
      sortedEquipment: {
        mainhands, 
        offhands, 
        bodies, 
        heads, 
        rings, 
        necklaces, 
        pets, 
        accessories
      }
    });
  }

  equipItem = (name) => {
    let state = this.state;
    let item = equipment[name];
    if (typeof item === 'object') {
      let tempSlot = item['slot'];
      tempSlot = tempSlot.toLowerCase();
      if (['sword', 'spear','staff','laser', 'crossbow', 'bow'].includes(tempSlot)) {
        state.equipped['mainhand'] = item;
        return this.setState(state);
      }
      state.equipped[tempSlot] = item;
    }
    this.setState(state);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header header">
          <h1 className="title">Bit Heroes Set/Mythic Planner</h1>
          <p className="sharable-link">
            []
          </p>
        </header>
        <section className="container">
          <div className="left">
            <div className="equipped">
              <Equipped equipped={this.state.equipped} />
            </div>
          </div>
          <div className="right">
            <div className="equipment">
              <Equipment equipItem={this.equipItem} mythics={this.state.mythics} sets={this.state.sets} equipment={this.state.equipment} sortedEquipment={this.state.sortedEquipment}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
