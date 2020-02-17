import React, { Component } from 'react';

import { sets } from '../sets';
import { equipment, sortEquipment } from '../equipment';
import { enchantTypes, mountTypes, runeTypes } from '../stats';

import Equipment from './Equipment';
import Equipped from './Equipped';
import BonusView from './BonusView';
import RuneWindow from './RuneWindow';
import StatWindow from './StatWindow';
import EnchantWindow from './EnchantWindow';

import {calculateBonuses, convertName, searchObjectArray } from '../functions';

const enchants = {
  enchantSlot1: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot2: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot3: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot4: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot5: {
      slot1: 'None',
      slot2: 'None'
  }, enchantSlot6: {
      slot1: 'None',
      slot2: 'None'
  }
};

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
        pet: {},
        mount: {}
      },
      sets,
      equipment,
      runes: [],
      enchants: {...enchants},
      bonuses: {},
      mythics: {},
      legendaries: {},
      mounts: mountTypes,
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
      urlEnd: "",
      showRunes: false,
      showEnchants: false,
      showStats: false,
      accessoryLevel: 1,
      stats: {},
      mythicsOpen: false,
      setsOpen: false,
      slotsOpen: false
    }
  }

  componentDidMount () {
    
    var sortedEquipment = this.state.sortedEquipment, mythics = {}, legendaries = {};
    [sortedEquipment, mythics, legendaries] = sortEquipment(equipment);

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
      pet: {},
      mount: {}
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

    //finding mount, runes, and enchants
    let runeValues = [], enchantValues = "", accessoryLevel = 1, baseStats = [6, 6, 6],tempVS;
    if (this.props.location.search && this.props.location.search !== "") {
      let x = this.props.location.search.split("?")[1];
      let temp = x.split("&");

      for (let x = 0; x < temp.length; x++) {
        let ts = temp[x].split('=');
        switch(ts[0]) {
          case 'mount':
          let tM = ts[1];
          if (parseInt(tM, 10) >= 0 && parseInt(tM, 10) < Object.keys(mountTypes).length) {
            equipped.mount = mountTypes[tM];
          }
          break;
          case 'enchantments':
          enchantValues = ts[1].split('');
          break;
          case 'runes':
          runeValues = ts[1].split('');
          break;
          case 'accessory':
          if (!isNaN(ts[1]) && ts[1] >= 0 && ts[1] <=4 ) {
            accessoryLevel = parseInt(ts[1],10);
          } 
          break;
          case 's':
            tempVS = parseInt(ts[1], 10);
            if (!isNaN(tempVS)) {
              baseStats[1] = tempVS;
            }
          break;
          case 'p': 
            tempVS = parseInt(ts[1], 10);
            if (!isNaN(tempVS)) {
              baseStats[0] = tempVS;
            }
          break;
          case 'a':
            tempVS = parseInt(ts[1], 10);
            if (!isNaN(tempVS)) {
              baseStats[2] = tempVS;
            }
          break;
          default:
          break;
        }
      }

    }

    //runeValues
    if (runeValues) {
      if (runeValues.length > 4) {
        runeValues.splice(4);
      } else if (runeValues.length < 4) {
        runeValues = runeValues.concat(['x', 'x', 'x', 'x']);
        runeValues.splice(4);
      }
    } else {
      runeValues = ['x', 'x', 'x', 'x'];
    }

    runeValues = runeValues.join('').toLowerCase().split('');

    for (let i = 0; i < runeValues.length; i++) {
      let foundVal = false;
      let y = 0;
      while(!foundVal) {
        if (runeTypes[y].id === runeValues[i]) {
          foundVal = true;
          runeValues[i] = runeTypes[y];
        }
        y++;

        if (y >= runeTypes.length) {
          foundVal = true;
        }
      }
    }

    //enchants
    let enchantmentsToState = Object.assign({}, enchants);

    if (enchantValues.length <= 0) {
      enchantValues = "xxxxxxxxxxxx".split('');
    }
    else if (enchantValues.length > 12) {
      enchantValues.splice(12);
    }
    else if (enchantValues.length < 12) {
      enchantValues = enchantValues.concat("xxxxxxxxxxxx".split(''));
      enchantValues.splice(12);
    }

    let u = 0, eS = 1, s = 1;
    for (let x = 0; x < enchantValues.length; x++) {
      let r1 = searchObjectArray(enchantTypes, 'id', enchantValues[x]);
      if (u%2 === 0 ) {
        enchantmentsToState['enchantSlot' + eS]['slot' + s] = r1;
        s++;
      } else {
        if (enchantmentsToState['enchantSlot' + eS]['slot1'].title !== r1.title) {
          enchantmentsToState['enchantSlot' + eS]['slot' + s] = r1;
        } else {
          enchantmentsToState['enchantSlot' + eS]['slot' + s] = searchObjectArray(enchantTypes, 'id', 'x');
        }
        s--;
        eS++;
      }
      u++;
    }

    let tempBonus = calculateBonuses(baseStats, equipped, runeValues, enchantmentsToState, accessoryLevel);
    bonuses = {...tempBonus.bonuses};
    let stats = tempBonus.stats;
    urlEnd = tempBonus.urlEnd;

    this.setState({
      sets,
      mythics,
      equipped,
      bonuses,
      urlEnd,
      enchants: enchantmentsToState,
      legendaries,
      runes: runeValues,
      sortedEquipment,
      stats,
      accessoryLevel
    });
  }

  equipItem = (name) => {
    let state = this.state;
    let item = equipment[name];

    if (name === "polychromatic_blaster") {
      item = equipment['polychromatic_blaster_main'];
    }

    if (typeof item === 'object') {
      let tempSlot = item['slot'];
      tempSlot = tempSlot.toLowerCase();
      if (['sword', 'spear','staff','laser', 'crossbow', 'bow', 'axe', 'laser gun', 'hammer'].includes(tempSlot)) {
        state.equipped['mainhand'] = item;
      } else {
        if (item.name === "Starweave") {
          if (item.slot === "Necklace" && state.equipped['ring'].name === "Starweave") {
            state.equipped['ring'] = {};
          }
          else if (item.slot === "Ring" && state.equipped['necklace'].name === "Starweave") {
            state.equipped['necklace'] = {};
          }
        }
        if (item.name === "Elementarium") {
          if (tempSlot === 'head' && state.equipped['body'].name === "Elementarium") {
            state.equipped['body'] = {};
          }
          if (tempSlot === 'body' && state.equipped['head'].name === "Elementarium") {
            state.equipped['head'] = {};
          }
        }
        state.equipped[tempSlot] = item;
      }
      if (item.name === "Polychromatic Blaster") {
        if (tempSlot === 'laser gun' && state.equipped['offhand'].name === "Polychromatic Blaster") {
          state.equipped['offhand'] = {};
        }
        if (tempSlot === 'offhand' && state.equipped['mainhand'].name === "Polychromatic Blaster") {
          state.equipped['mainhand'] = {};
        }
      }
    } else {
      item = mountTypes[name];
      state.equipped.mount = item;
    }

      let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel);
      let stats = bonuses.stats;
      state.stats = stats;
      state.bonuses = {...bonuses.bonuses};
      state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state});
  }

  equipRunes = (runeArray) => {
    let state = this.state;
    let runes = runeArray;

    //convert titles to objects
    for (let i = 0; i < runes.length; i++) {
      let foundVal = false;
      let y = 0;
      while(!foundVal) {
        if (runeTypes[y].title === runes[i]) {
          foundVal = true;
          runes[i] = runeTypes[y];
        }
        y++;

        if (y >= runeTypes.length) {
          foundVal = true;
        }
      }
    }

    state.runes = runes;
    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],this.state.equipped, state.runes, state.enchants, this.state.accessoryLevel);
    let stats = bonuses.stats;
    state.stats = stats;
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state});
  }

  equipEnchants = (enchantObject) => {
    var eTS = enchantObject;



    let c = 0;
    Object.keys(eTS).forEach((x) => {
      if (c <= 5) {
  
        let r1 = searchObjectArray(enchantTypes, 'title',eTS[x]['slot1']);
        let r2 = searchObjectArray(enchantTypes, 'title', eTS[x]['slot2']);
  
        let enchantArray = ["Absorb", "Block", "Damage Reduction", "Damage", "Damage Enrage", "Deflect Chance", "Dual Strike", "Empower Chance", "Evade", "Health", "Life Steal", "Speed", "None"];
  
        if (r1.value > 2 || !enchantArray.includes(r1.title)) {
          r1 =  {
            id: 'x',
            title: "None",
            selected: false,
            effect: "speed",
            value:  0,
            key: 'enchant'
          };
        }
        if (r2.value > 2 || !enchantArray.includes(r2.title)) {
          r2 =  {
            id: 'x',
            title: "None",
            selected: false,
            effect: "speed",
            value:  0,
            key: 'enchant'
          };
        }
  
        eTS[x]['slot2'] = r2;
        eTS[x]['slot1'] = r1;
      }
      c++;
    });

    let state = this.state;

    state.enchants = {...eTS};

    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],this.state.equipped, state.runes, eTS, this.state.accessoryLevel);
    let stats = bonuses.stats;
    state.stats = stats;
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

    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, state.runes, state.enchants, this.state.accessoryLevel);
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;
    let stats = bonuses.stats;
    state.stats = stats;
    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state})
  }

  handleOpenClose = (window) => {
    let state = this.state;
    switch (window) {
      case 'Enchants':
        state.showEnchants = !state.showEnchants;
      break;
      case 'Runes':
        state.showRunes = !state.showRunes;
      break;
      case 'Stats':
        state.showStats = !state.showStats;
        break;
      case 'mythicReveal':
        state.mythicsOpen = !state.mythicsOpen;
      break; 
      case 'setReveal':
        state.setsOpen = !state.setsOpen;
      break;
      case 'slotReveal':
        state.slotsOpen = !state.slotsOpen;
      break;
      default: 
      break;
    }

    this.setState({...state})
  }

  modifyAccessory = (value) => {
    let state = this.state;
    if (!isNaN(value)) {
      if (value < 0) {
        state.accessoryLevel = 0;
      } else if (value > 4) {
        state.accessoryLevel = 4;
      }
      else {
        state.accessoryLevel = Math.floor(value);
      }
    }
    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, state.runes, state.enchants, this.state.accessoryLevel);
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;
    let stats = bonuses.stats;
    state.stats = stats;
    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state})
  }

  updateStats = (value, stat) => {
    let state = this.state;
    let v = parseInt(value);

    if (!isNaN(v)) {
      state.stats[stat] = v;
    } else {
      state.stats[stat] = 0;
    }

    let bonuses = calculateBonuses([state.stats.power, state.stats.stamina, state.stats.agility], this.state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel);
    let stats = bonuses.stats;
    state.stats = stats;
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state});
  }

  render() {
    let runeWindowStyling, enchantWindowStyling, statWindowStyling;
    const showStyling = {
      left: 0
    };
    const hideStyling = {
      left: '-420px'
    };
    runeWindowStyling = ((this.state.showRunes) ? showStyling : hideStyling);
    enchantWindowStyling = ((this.state.showEnchants) ? showStyling : hideStyling);
    statWindowStyling = ((this.state.showStats) ? showStyling : hideStyling);

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
          <StatWindow updateStats={this.updateStats} styling={statWindowStyling} stats={this.state.stats} modifyAccessoryLevel={this.modifyAccessory} currentLevel={this.state.accessoryLevel} openClose={this.handleOpenClose}/>
          <RuneWindow styling={runeWindowStyling} equipRunes={this.equipRunes} runes={this.state.runes} openClose={this.handleOpenClose}/>
          <EnchantWindow styling={enchantWindowStyling} equipEnchants={this.equipEnchants} enchants={this.state.enchants} openClose={this.handleOpenClose} />
          <div className="sideNav">
            <div className="sideNav-stats" onClick={() => {this.handleOpenClose('Stats')}}>Stats</div>
            <div className="sideNav-runes" onClick={() => {this.handleOpenClose('Runes')}}>Runes</div>
            <div className="sideNav-enchants" onClick={() => {this.handleOpenClose('Enchants')}}>Enchants</div>
          </div>
          <div className="left">
            <div className="equipped">
              <Equipped  isOpen={this.state.slotsOpen} handleOpenClose={this.handleOpenClose} removeItem={this.removeItem} equipped={this.state.equipped} />
            </div>
          </div>
          <div className="right">
            <div className="bonuses">
              <BonusView bonuses={this.state.bonuses} />  
            </div>
            <div className="equipment">
              <Equipment mythicReveal={this.state.mythicsOpen} setReveal={this.state.setsOpen} slotReveal={this.state.slotsOpen} legendaries={this.state.legendaries} equipItem={this.equipItem} mythics={this.state.mythics} sets={this.state.sets} equipment={this.state.equipment} sortedEquipment={this.state.sortedEquipment} mounts={mountTypes} handleOpenClose={this.handleOpenClose} isOpen={this.state.slotsOpen}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;


