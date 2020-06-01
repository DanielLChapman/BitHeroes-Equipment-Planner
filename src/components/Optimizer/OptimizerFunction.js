import React, {Component} from 'react';
import {equipment, sortEquipment} from '../../equipment';
import {sets} from '../../sets';
import {base, runeTypes, enchantTypes, mountTypes } from '../../stats';
import {searchOptions, change} from '../../investigation';
import {calculateBonuses} from '../../functions';

import worker from '../../app.worker.js';
import WebWorker from '../../WebWorker';

let count = 0;
let counterLeft = 0;
let counterRight = 0;
let leftDone = false;
let rightDone = false;
let storedMaximum = {};

let maximum = {
    equipment: {
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
    runes: [],
    enchants: {

    },
    value: 0
};

export default class OptimizerFunction extends Component {

    constructor(props) {
		super(props);
		this.state = {
            sortedEquipment: {},
            searchOption: '',
            searchOptions: searchOptions,
            stats: {},
            currentlyEquipped: {},
            oldEquipped: {},
            runes: [],
            enchants: [],
            numChange: [],
            preparing: {
                currentlyEquipped: {

                }
            },
            maximum: {},
            count: 0,
		};
    }

    componentDidMount() {
        if (window.Worker) {
            this.worker = new WebWorker(worker);
            this.worker2 = new WebWorker(worker);
    
            this.worker.addEventListener('message', event => {
                maximum = event.data;
                if (!isNaN(maximum)) {
                    counterLeft = maximum;
                    document.getElementsByClassName('testing-space')[0].innerText = `Loading: ${counterLeft + counterRight} / ${this.props.numberOfOptions}`;
                } else {
                    if (rightDone) {
                        document.getElementsByClassName('testing-space')[0].innerText = 'Complete ↓↓';
                        
                        let newMaximumValueToShow = false;

                        if (storedMaximum !== {}) {
                            if (maximum.value <= storedMaximum.value) {
                                maximum = storedMaximum;
                            }
                        } 
                        if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                            newMaximumValueToShow = true;
                        }
    
                        if (newMaximumValueToShow) {
                            document.getElementsByClassName('button-new-equipment')[0].classList = 'notice-button button-new-equipment';
                            document.getElementsByClassName('output-investigation')[0].innerText =  'New ' + this.searchSearchOptions(this.state.searchOption).key + ": " + (maximum.value || 0);
                        } else {
                            document.getElementsByClassName('output-investigation')[0].innerText =  'Sorry, nothing better found'
                        
                        }
                    } else {
                        leftDone = true;
                        if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                            storedMaximum = maximum;
                        }
                    }    
                }
            });

            this.worker2.addEventListener('message', event => {
                maximum = event.data;
                if (!isNaN(maximum)) {
                    counterRight = maximum;
                    document.getElementsByClassName('testing-space')[0].innerText = `Loading: ${counterLeft + counterRight} / ${this.props.numberOfOptions}`;
                } else {
                    if (leftDone) {
                        document.getElementsByClassName('testing-space')[0].innerText = 'Complete ↓↓';
                        
                        let newMaximumValueToShow = false;

                        if (storedMaximum !== {}) {
                            if (maximum.value <= storedMaximum.value) {
                                maximum = storedMaximum;
                            }
                        } 
                        if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                            newMaximumValueToShow = true;
                        }
    
                        if (newMaximumValueToShow) {
                            document.getElementsByClassName('button-new-equipment')[0].classList = 'notice-button button-new-equipment';
                            document.getElementsByClassName('output-investigation')[0].innerText =  'New ' + this.searchSearchOptions(this.state.searchOption).key + ": " + (maximum.value || 0);
                        } else {
                            document.getElementsByClassName('output-investigation')[0].innerText =  'Sorry, nothing better found'
                        
                        }
                    }/* {
                        document.getElementsByClassName('testing-space')[0].innerText = 'Complete ↓↓';
                        if (storedMaximum !== {}) {
                            console.log('here');
                        }
                        if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                            document.getElementsByClassName('button-new-equipment')[0].classList = 'notice-button button-new-equipment';
                            document.getElementsByClassName('output-investigation')[0].innerText =  'New ' + this.searchSearchOptions(this.state.searchOption).key + ": " + (maximum.value || 0);
                        } else {
                            document.getElementsByClassName('output-investigation')[0].innerText =  'Sorry, nothing better found'
                        
                        }
                    } */ else {
                        rightDone = true;
                        if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                            storedMaximum = maximum;
                        }
                    }
                }

                
            });
        }
    }

    componentWillUnmount() {
        if (window.Worker) {
            this.worker.terminate();
            this.worker2.terminate();
        }
    }

    static getDerivedStateFromProps(props, state) {
        let y = sortEquipment(equipment, false)[0];
        //Load most recent equipment and stats into state
        if (props.sortedEquipment) {
            y = props.sortedEquipment;
        }

        //Load the number of options to search through into function
        let x = [y.mainhands.length,
            y.offhands.length,
            y.heads.length,
            y.bodies.length,
            y.necklaces.length,
            y.rings.length,
            y.accessories.length,mountTypes.length];

        return {
            clickHandler: props.clickHandler,
            searchOption: props.searchOption,
            stats: props.stats,
            currentlyEquipped: props.currentlyEquipped,
            runes: props.runes,
            enchants: props.enchants,
            numChange: x,
            sortedEquipment: y,
        };
    };

    searchSearchOptions = (inputValue) => {
        for (var x = 0; x < searchOptions.length; x++) {
            if (searchOptions[x].option === inputValue) {
                return searchOptions[x]
            }
        }
        return inputValue;
    }

    perparing = () => {
        if (this.props.options.length <= 0) {
            return alert('Please make sure it has something to search');
        }
        document.getElementsByClassName('button-new-equipment')[0].classList = 'notice-button button-new-equipment button-hidden';
        document.getElementsByClassName('testing-space')[0].innerText = 'Loading';
        document.getElementsByClassName('output-investigation')[0].innerText =  '';

        count = 0;
        let currentlyEquipped = {
            equipped: this.props.currentlyEquipped,
            enchants: this.state.enchants,
            runes: this.state.runes,
            stats: this.state.stats,
    
        }
    //     //modifiying searchingFor to fit with algorithm already made
        let sFR = [...change];

    
    //     sortedE = sortedEquipment;
        
        let splitOption = "";
        let splitNum = 0;
        
        for (var x = 0; x < sFR.length; x++) {
            if (this.props.options.includes(sFR[x].reference)) {
                if (splitOption === "") {
                    splitOption = sFR[x].reference;
                    splitNum = x;
                }
                sFR[x].symbol = '*';
            }
        };

        maximum.value = 0;

        //create variable equal to rounded down sortedEquipment split option
        //cut in half
        let half_length = Math.ceil(this.state.sortedEquipment[splitOption].length / 2);

        //create two new sorted equipments[options]
        let copiedSortedEquipment = Object.assign(this.state.sortedEquipment);
        let rightSlice = [...this.state.sortedEquipment[splitOption]];
        //set first one equal to 0-variable inclusive
        //second to variable-exclusive - length-1
        let leftSlice = rightSlice.splice(0, half_length);

        //update numChange
        let newNumChange = [...this.state.numChange];
    
        //Maybe move this to own function and have preparing done on every prop input
        if (window.Worker) {
            copiedSortedEquipment[splitOption] = leftSlice;
            newNumChange[splitNum] = half_length;
            leftDone = false;
            rightDone = false;
            counterLeft = 0;
            counterRight = 0;
            this.worker.postMessage({
                index: 0,
                currentlyEquipped,
                sFR,
                searchOption: this.state.searchOption,
                sortedEquipment: copiedSortedEquipment,
                numChange: newNumChange,
                numberOfOptions: this.props.numberOfOptions,
                sets: sets,
                base: base,
                runeTypes: runeTypes,
                enchantTypes: enchantTypes,
                mountTypes: mountTypes,

            });
            copiedSortedEquipment[splitOption] = rightSlice;
            newNumChange[splitNum] = this.state.sortedEquipment[splitOption].length - half_length;
            this.worker2.postMessage({
                index: 0,
                currentlyEquipped,
                sFR,
                searchOption: this.state.searchOption,
                sortedEquipment: copiedSortedEquipment,
                numChange: newNumChange,
                numberOfOptions: this.props.numberOfOptions,
                sets: sets,
                base: base,
                runeTypes: runeTypes,
                enchantTypes: enchantTypes,
                mountTypes: mountTypes,
            })
        } else {
            setTimeout( () => {
                this.recurveIncrement(0, currentlyEquipped, sFR, this.state.searchOption);
            }, 250)
        }
        
        

    }


    recurveIncrement = (index, equippedInput, whatToChange, searchingFor) => {
        //
        let i = index;
        

        //Clean up equipped into a better format, or create a null object if one is empty for some reason
        let equipped = {
            mainhand: equippedInput.equipped.mainhand || {},
            offhand: equippedInput.equipped.offhand || {},
            head: equippedInput.equipped.head || {},
            body: equippedInput.equipped.body || {},
            necklace: equippedInput.equipped.necklace || {},
            ring: equippedInput.equipped.ring || {},
            accessory: equippedInput.equipped.accessory || {},
            pet: equippedInput.equipped.pet || {},
            mount: equippedInput.equipped.mount || {}
        };

        //shortening name
        let sI = searchingFor;
        let stats = equippedInput.stats;
        //new equippedInput for future
        
        let r;
        
        //At the end of the line for equipment, we run the calculate bonuses
        if (i === 8 ) {
            count+=1;
            //counting total
            
            //calculate bonuses
            let bonuses = calculateBonuses([equippedInput.stats.power, equippedInput.stats.stamina, equippedInput.stats.agility], equipped, equippedInput.runes, equippedInput.enchants, 2);
            //grab the new equipment incase its in the maximum
            let equippedAfter = bonuses.bonuses;
            //grab the new stats
            let newStats = bonuses.stats;
            //This is where calculations would be.
            //Would set a maximum of specified result

            //If the new stat is higher than maximum, equip it to maximum
            //this is to separate the links and non links in the bonuse object
            
            let newStatsValue = newStats[sI] || newStats.links[sI] || 0;
            if (newStatsValue === undefined) {
                console.log({
                    newStats,
                    sI,
                    sI2: this.searchSearchOptions(sI),
                    sI3: newStats[sI],
                    sI4: newStats.links[sI],
                    sI5: newStats[sI] || newStats.links[sI]
                });
            }

            //greater than equal to for best chance at most recent equipment
            if (newStatsValue >= maximum.value) {
                maximum.value = newStatsValue;
                maximum.equipment = equippedAfter.equipmentOn;
                maximum.runes = equippedInput.runes;
                maximum.enchants = equippedInput.enchants;
                
            } 

            //temporary, need to clean up
            if (count === this.props.numberOfOptions) {

                /*
                    TODO: IF AN EQUIPMENT CHANGE DOESN'T AFFECT THE FINAL TOTAL, THEN WE SHOULDN'T CHANGE IT
                    Done - CANT DO TWO STARWEAVES, DIDN'T CHECK FOR ANCIENTS

                    Kind of done - ADD ABILITY TO REMOVE ITEMS FROM APPEARING
                    Done - ADD ABILITY TO REMOVE ANCIENTS
                
                */
                document.getElementsByClassName('testing-space')[0].innerText = 'Complete ↓↓';
                
                if (maximum.value > this.props.stats[this.state.searchOption] || maximum.value > this.props.stats.links[this.state.searchOption]) {
                    document.getElementsByClassName('button-new-equipment')[0].classList = 'notice-button button-new-equipment';
                    document.getElementsByClassName('output-investigation')[0].innerText =  'New ' + this.searchSearchOptions(sI).key + ": " + (maximum.value || 0);
                } else {
                    document.getElementsByClassName('output-investigation')[0].innerText =  'Sorry, nothing better found'
                
                }
            }
        }
        else if (whatToChange[i].symbol === '*') {
            //only change equipment on this stage
            //this was giving me an issue, t= index + 1 solved it
            let t = index + 1;
            //mounts are not in sorted equipment so take it out, would be the same for runes, enchants
            if (i===7) {
                //loop over all the mounts
                for(let x = 0; x < this.state.numChange[i]; x++) {
                    //equip it
                    equipped[change[i].slot] = mountTypes[i];

                    //send it back in for future testing
                    r = {   
                        equipped,
                        enchants: equippedInput.enchants,
                        runes: equippedInput.runes,
                        stats,
                
                    }
                    //call it
                    this.recurveIncrement(t, r, whatToChange, sI);
                }

            }
            else {
                if (this.state.numChange[i] <= 0) {
                    r = {
                        equipped,
                        enchants: equippedInput.enchants,
                        runes: equippedInput.runes,
                        stats,
                
                    }
                    return this.recurveIncrement(t, r, whatToChange, sI);
                }
                for(let x = 0; x < this.state.numChange[i]; x++) {
                    //equip[i]+=1;
                    try {
                        //for all equipment in sorted equipment, try to add
                        if (this.state.sortedEquipment[whatToChange[i].reference][x].type === "ancient") {
                            if (['Polychromatic Blaster', 'Starweave', 'Elementarium'].includes(this.state.sortedEquipment[whatToChange[i].reference][x].name)) {
                              let q = x-1;
                              switch(this.state.sortedEquipment[whatToChange[i].reference][x].name) {
                                case 'Polychromatic Blaster':
          
                                  if (whatToChange[i].slot === 'offhand') {
                                    if (equipped.mainhand.name !== "Polychromatic Blaster") {
                                      q = x;
                                    }
                                  } else {
                                    if (equipped.offhand.name !== "Polychromatic Blaster") {
                                      q = x;
                                    }
                                  }
                                  break;
                                case 'Starweave':
                                  if (whatToChange[i].slot === 'necklace') {
                                    if (equipped.ring.name !== "Starweave") {
                                      q = x;
                                    }
                                  } else {
                                    if (equipped.necklace.name !== "Starweave") {
                                      q = x;
                                    }
                                  }
                                  break;
                                case 'Elementarium':
                                  if (whatToChange[i].slot === 'body') {
                                    if (equipped.head.name !== "Elementarium") {
                                      q = x;
                                    }
                                  } else {
                                    if (equipped.body.name !== "Elementarium") {
                                      q = x;
                                    }
                                  }
                                  break;
                                default: 
                                  console.log(this.state.sortedEquipment[whatToChange[i].reference][x].name);
                              }
                              equipped[whatToChange[i].slot] = this.state.sortedEquipment[whatToChange[i].reference][q];  
                            }
                          } else {
                            equipped[whatToChange[i].slot] = this.state.sortedEquipment[whatToChange[i].reference][x];
                          }
                    } catch (error) {
                        //think the error was from mounts, so try catch may no longer be necessary but will keep for debugging
                        console.log({
                            i: i,
                            x: x,
                        });
                    }
                    //send back in for future testing
                    r = {
                        equipped,
                        enchants: equippedInput.enchants,
                        runes: equippedInput.runes,
                        stats,
                
                    }
                    this.recurveIncrement(t, r, whatToChange, sI);
                }
            }
            
        } else {
            //if its not supposed to be changed, skip it.
            i+=1;
            r = {
                equipped,
                enchants: equippedInput.enchants,
                runes: equippedInput.runes,
                stats,
        
            }
            this.recurveIncrement(i, r, whatToChange, sI);
        }
        
    }


    render() {
        return (
            <>
           <section className="counter">
                    Total Number of Combinations To Search : {this.props.numberOfOptions}
                </section>
                <section className="submit">
                    <button className={`notice-button notice-button-false`} disabled={!this.props.searchOption} onClick={() => {
                        this.perparing();
                    }}>Start Searching!</button>
                </section>
                <section className="counter counter-testing counter-results">

                    <span className="testing-space"> Waiting </span>
                    <br /><br />
                    <ul>
                        <li></li>
                    {this.state.searchOption && this.state.searchOption !== 'none' && (
                        <>
                        <li>Current {this.searchSearchOptions(this.state.searchOption).key}: {this.props.stats[this.state.searchOption] || 0}</li>
                        <li className='output-investigation'></li>
                        </>
                    )}
                    <br />
                    </ul>
                    <button className="notice-button button-new-equipment button-hidden" onClick={() => {
                        //this.handleButtonClick('Equip New Items');
                        //</section>this.perparing();
                        this.props.optimizeEquip(maximum);
                    }}>Equip New Items</button>
                </section>
            </>
        )
    }

}