import React, {Component} from 'react';
import {equipment, sortEquipment} from '../../equipment';
import {searchOptions, change, optimize, maximum} from '../../investigation';
import {calculateBonuses} from '../../functions';
import { mountTypes } from '../../stats';

let numChange;

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
		};
    }

    static getDerivedStateFromProps(props, state) {
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

    perparing = () => {
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
    
        this.recurveIncrement(0, currentlyEquipped, sFR, this.state.searchOption)

    }


    recurveIncrement = (index, equippedInput, whatToChange, searchingFor) => {
        //
        let i = index;
        let c = 0;

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

            //calculate bonuses
            let bonuses = calculateBonuses([equippedInput.stats.power, equippedInput.stats.stamina, equippedInput.stats.agility], equipped, equippedInput.runes, equippedInput.enchants, 2);
            //grab the new equipment incase its in the maximum
            let equippedAfter = bonuses.bonuses;
            //grab the new stats
            let newStats = bonuses.stats;
            //This is where calculations would be.
            //Would set a maximum of specified result


            if (newStats[sI] > maximum.value) {

                maximum.value = newStats[sI];
                maximum.equipment = equippedAfter.equipmentOn;
                maximum.runes = equippedInput.runes;
                maximum.enchants = equippedInput.enchants;
                
            }

            console.log(maximum);
            document.getElementsByClassName('testing-space')[0].innerText = 'Complete ↓↓';
            document.getElementsByClassName('output-investigation')[0].innerText = '\n \n New ' + sI + ": " + maximum.value;
            
            
            return ; 
        }
        else if (whatToChange[i].symbol === '*') {
            //only change equipment on this stage
            let t = index + 1;
            for(let x = 0; x < this.state.numChange[i]; x++) {
                //equip[i]+=1;
                try {
                    equipped[change[i].slot] = this.state.sortedEquipment[whatToChange[i].reference][x];
                } catch (error) {
                    console.log({
                        i: i,
                        x: x,
                    });
                    console.log(this.state.sortedEquipment[whatToChange[i].reference][x]);
                    console.log(equipped[change[i].slot]);
                }
                r = {
                    equipped,
                    enchants: equippedInput.enchants,
                    runes: equippedInput.runes,
                    stats,
            
                }
                this.recurveIncrement(t, r, whatToChange, sI);
            }
        } else {
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
                    <button className={`notice-button notice-button-false`}  onClick={() => {
                        this.perparing();
                    }}>Start Searching!</button>
                </section>
                <section className="counter counter-testing counter-results">
                    <span className="testing-space"> Waiting </span>
                    <br /><br />
                    {this.state.searchOption && this.state.searchOption !== 'none' && (
                        `Current: ${this.state.searchOption}: ${this.props.stats[`${this.state.searchOption}`]}`
                    )}
                    <br />
                    <span className='output-investigation'> </span>
                    <button onClick={() => {
                        //this.handleButtonClick('Equip New Items');
                        this.perparing();
                    }}></button>
                </section>
            </>
        )
    }

}