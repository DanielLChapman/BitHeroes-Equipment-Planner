import React, { Component } from 'react';

import { sets } from '../sets';
import { equipment, sortEquipment } from '../equipment';
import { mountTypes } from '../mounts';
import {enchantTypes } from '../enchants';
import {runeTypes, metaRunes, artifactRunes } from '../runes';



import Equipment from './Equipment';
import Equipped from './Equipped';
import BonusView from './BonusView';
import RuneWindow from './RuneWindow';
import StatWindow from './StatWindow';
import EnchantWindow from './EnchantWindow';
import OptimizerWindow from './OptimizerWindow';
import AboutWindow from './AboutWindow';

import {calculateBonuses, convertName, searchObjectArray } from '../functions';

//import TinyURL from 'tinyurl';


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
      showOptimizer: false,
      showAbout: false,
      accessoryLevel: 1,
      stats: {},
      min_stats: {},
      max_stats: {},
      mythicsOpen: false,
      setsOpen: false,
      slotsOpen: false,
      t12: true,
      //tinyURL: "",
      evolviumTable: {
        aorb: '',
        cord: '',
        eorf: '',
        gorh: ''
      }
    }
  }

  /*
 async componentDidUpdate(prevProps) {
    let newURL = 'https://bit-heroes-equipment.herokuapp.com/' + this.state.urlEnd
    let returnURL = "";

    await TinyURL.shorten(newURL, (res, err) => {
      returnURL = res;
      if (this.state.tinyURL !== returnURL) {
        this.setState({
          tinyURL: returnURL
        })
      }
    });

  }*/ 


  componentDidMount () {
    var sortedEquipment = this.state.sortedEquipment, mythics = {}, legendaries = {};
    [sortedEquipment, mythics, legendaries] = sortEquipment(equipment);
    let evolviumTable = {
      aorb: '',
      cord: '',
      eorf: '',
      gorh: ''
    }

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
          case 'evolvium':
            let toSort = ts[1].split('');
            toSort.forEach((x) => {
              if ('aorb'.includes(x)) {
                evolviumTable.aorb = x;
              }
              if ('cord'.includes(x)) {
                evolviumTable.cord = x;
              }
              if ('eorf'.includes(x)) {
                evolviumTable.eorf = x;
              }
              if ('gorh'.includes(x)) {
                evolviumTable.gorh = x;
              }
            })
            break;
          default:
          break;
        }
      }

    }

    //runeValues
    if (runeValues) {
      if (runeValues.length > 6) {
        runeValues.splice(6);
      } else if (runeValues.length <= 6) {
        runeValues = runeValues.concat(['x', 'x', 'x', 'x', 'x', 'x']);
        runeValues.splice(6);
      }
    } else {
      runeValues = ['x', 'x', 'x', 'x', 'x', 'x'];
    }

    runeValues = runeValues.join('').toLowerCase().split('');
    let meta = runeValues.splice(4);
    let artifact = meta.splice(1);



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

    let found = false;
    //meta
    Object.keys(metaRunes).forEach((x) => {

      if (meta[0] === metaRunes[x].id) {
        found = true;
        runeValues.push(metaRunes[x]);
      }
    })

    //error handling of invalid id runes
    if (!found) {
      runeValues.push(metaRunes[metaRunes.length - 1])
    }

    found = false;
    //artifacts
    Object.keys(artifactRunes).forEach((x) => {

      if (artifact[0] === artifactRunes[x].id) {
        found = true;
        runeValues.push(artifactRunes[x]);
      }
    })
    
    if (!found) {
      runeValues.push(artifactRunes[artifactRunes.length - 1]);
    }

    //enchants
    let enchantmentsToState = Object.assign({}, enchants);

    if (enchantValues.length <= 0) {
      enchantValues = "xxxxxxxxxxxxxxxxxxxxxxxx".split('');
    }
    else if (enchantValues.length > 24) {
      enchantValues.splice(24);
    }
    else if (enchantValues.length <= 24) {
      enchantValues = enchantValues.concat("xxxxxxxxxxxxxxxxxxxxxxxx".split(''));
      enchantValues.splice(24);
    }

    let u = 0, eS = 1, s = 1;
    for (let x = 0; x < enchantValues.length; x++) {
      let enchantValuesSorted = enchantValues[x]
      try {
        enchantValuesSorted = enchantValues[x] + "" + enchantValues[x+1];
      } catch (error ) {
        console.log(error);
      }


      let r1 = searchObjectArray(enchantTypes, 'id', enchantValuesSorted);

      if (u%2 === 0 ) {
        enchantmentsToState['enchantSlot' + eS]['slot' + s] = r1;
        s++;
      } else {
        if (enchantmentsToState['enchantSlot' + eS]['slot1'].title !== r1.title) {
          enchantmentsToState['enchantSlot' + eS]['slot' + s] = r1;
        } else if (enchantmentsToState['enchantSlot' + eS]['slot1'].mythic) {
          enchantmentsToState['enchantSlot' + eS]['slot2'] = searchObjectArray(enchantTypes, 'id', 'xx');
        } else if (enchantmentsToState['enchantSlot' + eS]['slot2'].mythic) {
          enchantmentsToState['enchantSlot' + eS]['slot1'] = searchObjectArray(enchantTypes, 'id', 'xx');
        }
        else {
          enchantmentsToState['enchantSlot' + eS]['slot' + s] = searchObjectArray(enchantTypes, 'id', 'xx');
        }
        s--;
        eS++;
      }
      u++;
      x++;
    }

    let tempBonus = calculateBonuses(baseStats, equipped, runeValues, enchantmentsToState, accessoryLevel, true, evolviumTable);
      
    bonuses = {...tempBonus.bonuses};
    let stats = tempBonus.stats;
    let min_stats = tempBonus.min_stats;
    let max_stats = tempBonus.max_stats;
    urlEnd = tempBonus.urlEnd;

    this.setState({
      sets,
      mythics,
      min_stats,
      max_stats,
      equipped,
      bonuses,
      urlEnd,
      enchants: enchantmentsToState,
      legendaries,
      runes: runeValues,
      sortedEquipment,
      stats,
      accessoryLevel,
      evolviumTable,
    });
  }

  equipItem = async (name) => {
    
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

      let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel, this.state.t12, this.state.evolviumTable);
      state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
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
    let meta = runes.splice(4);
    let artifact = meta.splice(1);

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




    let found = false;
    //meta rune
    Object.keys(metaRunes).forEach((x) => {

      if (meta[0] === metaRunes[x].title) {
        found = true;
        runes.push(metaRunes[x]);
      }
    })
    if (!found) {
      runes.push(metaRunes[metaRunes.length - 1]);
    }
    
    found = false;
    //meta rune
    Object.keys(artifactRunes).forEach((x) => {
      if (artifact[0] === artifactRunes[x].title) {
        found = true;
        runes.push(artifactRunes[x]);
      }
    })
    if (!found) {
      runes.push(artifactRunes[artifactRunes.length - 1]);
    }

    state.runes = runes;
    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],this.state.equipped, state.runes, state.enchants, this.state.accessoryLevel, this.state.t12, this.state.evolviumTable);
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
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
    let enchantArray = [];
          for (var i = 0; i < enchantTypes.length; i++) {
            enchantArray.push(enchantTypes[i].title);
          } 
    Object.keys(eTS).forEach((x) => {
      if (!['alreadyUpdated', 'ownUpdate'].includes(x)) {
        if (c <= 5) {
    
          let r1 = searchObjectArray(enchantTypes, 'title', eTS[x]['slot1']);
          let r2 = searchObjectArray(enchantTypes, 'title', eTS[x]['slot2']);
          
        
          eTS[x]['slot2'] = r2;
          eTS[x]['slot1'] = r1;
        }
        c++;
      }
    });

    let state = this.state;

    state.enchants = {...eTS};

    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],this.state.equipped, state.runes, eTS, this.state.accessoryLevel, this.state.t12, this.state.evolviumTable);
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
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

    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, state.runes, state.enchants, this.state.accessoryLevel, this.state.t12, this.state.evolviumTable);
    state.bonuses = {...bonuses.bonuses};
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats

    state.urlEnd = bonuses.urlEnd;
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
      case 'Optimizer':
        state.showOptimizer = !state.showOptimizer
        break;
      case 'About':
        state.showAbout = !state.showAbout;
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
      case 't12DD':
        state.t12 = !state.t12;
        let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, state.runes, state.enchants, this.state.accessoryLevel, state.t12);
        state.bonuses = {...bonuses.bonuses};
        state.min_stats = bonuses.min_stats;
        state.max_stats = bonuses.max_stats;
        state.stats = bonuses.stats
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
    let bonuses = calculateBonuses([this.state.stats.power, this.state.stats.stamina, this.state.stats.agility],state.equipped, state.runes, state.enchants, this.state.accessoryLevel,this.state.t12, this.state.evolviumTable);
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
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

    let bonuses = calculateBonuses([state.stats.power, state.stats.stamina, state.stats.agility], this.state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel,this.state.t12, this.state.evolviumTable);
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    this.setState({...state});
  }

  optimizeEquip = (inputObject) => {
    let state = this.state;
    //Find out whats been changed
    if (inputObject.enchants && inputObject.enchants !== this.state.enchants) {
      state.enchants = inputObject.enchants;
    }
    if (inputObject.runes && inputObject.runes !== this.state.runes) {
      state.runes = inputObject.runes;
    }

    
    state.equipped = inputObject.equipment;


    let bonuses = calculateBonuses([state.stats.power, state.stats.stamina, state.stats.agility], this.state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel,this.state.t12, this.state.evolviumTable);
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
    state.bonuses = {...bonuses.bonuses};
    state.urlEnd = bonuses.urlEnd;

    try {
      this.props.history.push(`/${state.urlEnd}`);
    }
    catch (err) {
    }

    //update state

    this.setState({...state});

  }

  evolviumSelectOption = (option) => {
    let state = this.state;
    if (['a', 'b'].includes(option)) {
        state.evolviumTable.aorb === option ? state.evolviumTable.aorb = '' : state.evolviumTable.aorb = option;
    }
    if (['c', 'd'].includes(option)) {
        state.evolviumTable.cord === option ? state.evolviumTable.cord = '' : state.evolviumTable.cord = option;
    }
    if (['e', 'f'].includes(option)) {
        state.evolviumTable.eorf === option ? state.evolviumTable.eorf = '' : state.evolviumTable.eorf = option;
    }
    if (['g', 'h'].includes(option)) {
        state.evolviumTable.gorh === option ? state.evolviumTable.gorh  = '' : state.evolviumTable.gorh  = option;
    }

    let bonuses = calculateBonuses([state.stats.power, state.stats.stamina, state.stats.agility], this.state.equipped, this.state.runes, this.state.enchants, this.state.accessoryLevel,this.state.t12, this.state.evolviumTable);
    state.min_stats = bonuses.min_stats;
    state.max_stats = bonuses.max_stats;
    state.stats = bonuses.stats
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
    let runeWindowStyling, enchantWindowStyling, statWindowStyling, optimizerWindowStyling, aboutWindowStyling;
    const showStyling = {
      left: 0
    };
    let hideStyling;
    window.innerWidth > 900 ? hideStyling = {left: '-420px'} : hideStyling = {left: '-420px'}
    
    runeWindowStyling = ((this.state.showRunes) ? showStyling : hideStyling);
    enchantWindowStyling = ((this.state.showEnchants) ? showStyling : hideStyling);
    statWindowStyling = ((this.state.showStats) ? showStyling : hideStyling);
    optimizerWindowStyling = ((this.state.showOptimizer) ? showStyling : hideStyling);
    aboutWindowStyling = ((this.state.showAbout) ? showStyling : hideStyling);
    return (
      <div className="App">
        <header className="App-header header">
          <h1 className="title">Bit Heroes Equipment Planner</h1>
          <p className="sharable-link">

            Share: <input
                    readOnly
                    value={`https://bit-heroes-equipment.herokuapp.com/${this.state.urlEnd}`}></input>
            {//Tiny <input
               //     readOnly
                 //   value={this.state.tinyURL}></input>
                }
          </p>
          
        </header>
        <section className="menu">
          <AboutWindow />
          <StatWindow 
            updateStats={this.updateStats} 
            styling={statWindowStyling} 
            stats={this.state.stats} 
            min_stats={this.state.min_stats}
            max_stats={this.state.max_stats}
            modifyAccessoryLevel={this.modifyAccessory} 
            currentLevel={this.state.accessoryLevel} 
            openClose={this.handleOpenClose} 
            t12={this.state.t12} />
          <RuneWindow 
            styling={runeWindowStyling} 
            equipRunes={this.equipRunes} 
            runes={this.state.runes} 
            openClose={this.handleOpenClose}/>
          <EnchantWindow 
            styling={enchantWindowStyling} 
            equipEnchants={this.equipEnchants} 
            enchants={this.state.enchants} 
            openClose={this.handleOpenClose} />
          <OptimizerWindow 
            styling={optimizerWindowStyling}  
            equipped={this.state.equipped} 
            mounts={mountTypes} 
            runes={this.state.runes} 
            enchants={this.state.enchants} 
            stats={this.state.stats} 
            sortedEquipment={this.state.sortedEquipment} 
            openClose={this.handleOpenClose} 
            optimizeEquip={this.optimizeEquip}
            sets={this.state.sets} />
          <AboutWindow 
            styling={aboutWindowStyling} 
            openClose={this.handleOpenClose}/>
          <div className="sideNav">
            <div className="sideNav-stats" onClick={() => {this.handleOpenClose('Stats')}}>Stats</div>
            <div className="sideNav-runes" onClick={() => {this.handleOpenClose('Runes')}}>Runes</div>
            <div className="sideNav-enchants" onClick={() => {this.handleOpenClose('Enchants')}}>Enchants</div>
            <div className="sideNav-optimizer" onClick={() => {this.handleOpenClose('Optimizer')}}>Equipment Filler</div>

            <div className="sideNav-About" onClick={() => {this.handleOpenClose('About')}}>About / Updates</div>
          </div>
        </section>
        <section className="container">
          
          <div className="left">
            <div className="equipped">
              <Equipped  isOpen={this.state.slotsOpen} handleOpenClose={this.handleOpenClose} removeItem={this.removeItem} equipped={this.state.equipped} />
            </div>
          </div>
          <div className="right">
            <div className="bonuses">
              <BonusView bonuses={this.state.bonuses} evolviumTable={this.state.evolviumTable} evolviumSelect={this.evolviumSelectOption}/>  
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


