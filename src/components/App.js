import React, { Component } from 'react';

import { sets } from '../sets';
import { equipment } from '../equipment';

import Equipment from './Equipment';
import Equipped from './Equipped';
import BonusView from './BonusView';

var calculateBonuses = (equipmentOn) => {
  let bonuses = {
    mythics: [],
    sets: {},
    pets: []
  };
  let setsToSort = {};

  Object.keys(equipmentOn).forEach((x) => {

    if (equipmentOn[x].type === "mythic") {
      bonuses.mythics.push(equipmentOn[x]);
    } else  if (equipmentOn[x].type === "set") {
      setsToSort[equipmentOn[x].partOfSet] = setsToSort[equipmentOn[x].partOfSet] + 1 || 1;
      if (equipmentOn[x].slot === "Pet" || equipmentOn[x].slot === "Accessory") {
        bonuses.pets.push(equipmentOn[x]);
      }
    } 
  });

  Object.keys(setsToSort).forEach((x) => {
    if (setsToSort[x] >= 2 ) {
      //grab set to get set bonuses,
      let setWorkingOn = sets[x];
      //Figure out which bonuses it gets;
      bonuses.sets[x] = [];
      Object.keys(setWorkingOn.setBonuses).forEach((y) => {
        if (setsToSort[x] >= parseInt(y, 10)) {
          bonuses.sets[x].push(setWorkingOn.setBonuses[y]);
        }
      })
    }
  });
  return bonuses;
}

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      equipped: {
        mainhand: {},
        offhand: {},
        head: {},
        body: {},
        necklace: {},
        ring: {},
        accessory: {},
        pet: {}
      },
      sets,
      equipment,
      bonuses: {},
      mythics: {},
      sortedEquipment: {
        mainhands: {},
        offhands: {},
        heads: {},
        bodies: {},
        necklaces: {},
        rings: {},
        accessories: {},
        pets: {}
      }
    }
  }

  componentDidMount () {
    var mainhands = {}, offhands = {}, 
    bodies = {}, heads = {}, rings = {}, 
    necklaces = {}, pets = {}, accessories = {}, mythics = {};
    Object.keys(equipment).forEach( (x) => {
      equipment[x].image = `${x}.png`

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
      });
    });

    this.setState({
      sets,
      mythics,
      sortedEquipment: {
        mainhands, 
        offhands, 
        bodies, 
        heads, 
        necklaces, 
        rings,
        accessories, 
        pets
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
        this.setState(state);
      } else {
        state.equipped[tempSlot] = item;
      }
    }
    state.bonuses = {...calculateBonuses(state.equipped)};

    this.setState({...state});
  }

  removeItem = (slot) => {
    let state = this.state;
    state.equipped[slot] = {};
    state.bonuses = calculateBonuses(state.equipped);

    this.setState({...state})
  }


  render() {
    return (
      <div className="App">
        <header className="App-header header">
          <h1 className="title">Bit Heroes Equipment Planner</h1>
          <p className="sharable-link">
            Shareable Link : []
          </p>
        </header>
        <section className="container">
          <div className="left">
            <div className="equipped">
              <Equipped removeItem={this.removeItem} equipped={this.state.equipped} />
            </div>
          </div>
          <div className="right">
            <div className="bonuses">
              <BonusView bonuses={this.state.bonuses} />  
            </div>
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
