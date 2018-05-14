import React, { Component } from 'react';

import { sets } from '../sets';
import { equipment } from '../equipment';
import { base } from '../stats';

import Equipment from './Equipment';
import Equipped from './Equipped';
import BonusView from './BonusView';

import {calculateBonuses, convertName} from '../functions';

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
      runes: base.runes,
      enchants: base.enchants,
      bonuses: {},
      mythics: {},
      legendaries: {},
      sortedEquipment: {
        mainhands: {},
        offhands: {},
        heads: {},
        bodies: {},
        necklaces: {},
        rings: {},
        accessories: {},
        pets: {}
      },
      urlEnd: ""
    }
  }

  componentDidMount () {
    var sortedEquipment = this.state.sortedEquipment, mythics = {}, legendaries = {};

    Object.keys(equipment).forEach( (x) => {
      equipment[x].image = `${x}.png`

      if (equipment[x].type === "mythic") {
        mythics[x] = equipment[x];
      } else if (equipment[x].type ==="legendary") {
        legendaries[x] = equipment[x];
      }
      switch(equipment[x].slot) {
        case 'Offhand':
          sortedEquipment.offhands[x] = equipment[x];
          break;
        case 'Body':
          sortedEquipment.bodies[x] = equipment[x];
          break;
        case 'Head':
          sortedEquipment.heads[x] = equipment[x];
          break;
        case 'Ring':
          sortedEquipment.rings[x] = equipment[x];
          break;
        case 'Necklace':
          sortedEquipment.necklaces[x] = equipment[x];
          break;
        case 'Pet':
          sortedEquipment.pets[x] = equipment[x];
          break;
        case 'Accessory':
          sortedEquipment.accessories[x] = equipment[x];
          break;
        default: 
          sortedEquipment.mainhands[x] = equipment[x];
      };
    });

    Object.keys(sets).forEach( (x) => {
      Object.keys(sets[x].items).forEach( (y) => {
        let t = sets[x].items[y];
        if (typeof t === "object") {
          t = t.name;
        }
        t = convertName(t);
        sets[x].items[y] = equipment[t]
      });
    });

    var bonuses, urlEnd;
    var equipped = {
      mainhand: {},
      offhand: {},
      head: {},
      body: {},
      necklace: {},
      ring: {},
      accessory: {},
      pet: {}
    };

    //finding equipped items
    if (this.props.match && this.props.match.params.parameters) {
      let equipArray = this.props.match.params.parameters.match(/.{1,2}/g);

      equipArray.forEach((x) => {
        if(x.split('').length === 2) {
          Object.keys(equipment).forEach((y) => {
            if (equipment[y].shareID === x) {
              switch(equipment[y].slot) {
                case 'Offhand':
                  equipped.offhand = equipment[y];
                  break;
                case 'Body':
                  equipped.body = equipment[y];
                  break;
                case 'Head':
                  equipped.head = equipment[y];
                  break;
                case 'Ring':
                  equipped.ring = equipment[y];
                  break;
                case 'Necklace':
                  equipped.necklace = equipment[y];
                  break;
                case 'Pet':
                  equipped.pet = equipment[y];
                  break;
                case 'Accessory':
                  equipped.accessory= equipment[y];
                  break;
                default: 
                  equipped.mainhand = equipment[y];
              };
            }
          })
        }
      });
    }
    let tempBonus = calculateBonuses(equipped);
    bonuses = {...tempBonus.bonuses};
    urlEnd = tempBonus.urlEnd;

    this.setState({
      sets,
      mythics,
      equipped,
      bonuses,
      urlEnd,
      legendaries,
      sortedEquipment
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

    let bonuses = calculateBonuses(state.equipped);

    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state});
  }

  removeItem = (slot) => {
    let state = this.state;
    state.equipped[slot] = {};

    let bonuses = calculateBonuses(state.equipped);
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state})
  }


  render() {
    return (
      <div className="App">
        <header className="App-header header">
          <h1 className="title">Bit Heroes Equipment Planner</h1>
          <p className="sharable-link">
            Share: <input
                    readOnly
                    value={`https://bit-heroes-equipment.herokuapp.com/${this.state.urlEnd}`}></input>
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
              <Equipment legendaries={this.state.legendaries} equipItem={this.equipItem} mythics={this.state.mythics} sets={this.state.sets} equipment={this.state.equipment} sortedEquipment={this.state.sortedEquipment}/>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default App;
