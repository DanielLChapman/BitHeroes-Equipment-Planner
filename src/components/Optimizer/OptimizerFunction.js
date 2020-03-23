import React, {Component} from 'react';
import {equipment, sortEquipment} from '../../equipment';
import {searchOptions, change} from '../../investigation';
import {calculateBonuses} from '../../functions';
import { mountTypes } from '../../stats';

let count = 0;

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
            sortedEquipment: sortEquipment(equipment, false)[0],
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
            maximum: {}
		};
    }

    static getDerivedStateFromProps(props, state) {
        //Load most recent equipment and stats into state

        //Load the number of options to search through into function
        let x = [state.sortedEquipment.mainhands.length,
            state.sortedEquipment.offhands.length,
            state.sortedEquipment.heads.length,
            state.sortedEquipment.bodies.length,
            state.sortedEquipment.necklaces.length,
            state.sortedEquipment.rings.length,
            state.sortedEquipment.accessories.length,mountTypes.length];

        return {
            clickHandler: props.clickHandler,
            searchOption: props.searchOption,
            stats: props.stats,
            currentlyEquipped: props.currentlyEquipped,
            runes: props.runes,
            enchants: props.enchants,
            numChange: x,
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
        
        
        for (var x = 0; x < sFR.length; x++) {
            if (this.props.options.includes(sFR[x].reference)) {
                sFR[x].symbol = '*';
            }
        };

        maximum.value = 0;
/* 


        maximum = {
            equipment: currentlyEquipped.equipped,
            runes: currentlyEquipped.runes,
            enchants: currentlyEquipped.enchants,
            value: this.props.stats[this.state.searchOption] || this.props.stats.links[this.state.searchOption]
        }; */

    
        //Maybe move this to own function and have preparing done on every prop input
        setTimeout( () => {
            this.recurveIncrement(0, currentlyEquipped, sFR, this.state.searchOption);
        }, 250)
        

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
                    CANT DO TWO STARWEAVES, DIDN'T CHECK FOR ANCIENTS

                    ADD ABILITY TO REMOVE ITEMS FROM APPEARING
                    ADD ABILITY TO REMOVE ANCIENTS
                
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

                for(let x = 0; x < this.state.numChange[i]; x++) {
                    //equip[i]+=1;
                    try {
                        //for all equipment in sorted equipment, try to add
                        equipped[change[i].slot] = this.state.sortedEquipment[whatToChange[i].reference][x];
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