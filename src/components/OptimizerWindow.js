import React from 'react';
import PropTypes from "prop-types";
import {equipment, sortEquipment} from '../equipment';
import {searchOptions, change, optimize} from '../investigation';
import OptimizerNotice from './Optimizer/OptimizerNotice';

export default class OptimizerWindow extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            equipped: {},
            note: false,
            howto: false,
            searchOptions: searchOptions,
            over4: false,
            searchOption: '',
            equipmentOptions: [],
            sortedEquipment: sortEquipment(equipment, false)[0],
            numberOfOptions: 0,
            optimized: false,
            optimizedEquipment: {}
		};
    }

    static getDerivedStateFromProps(props, state) {
        if (typeof props.equipped !== undefined ) {
            return {equipped: props.equipped};
        };
    };

    handleButtonClick = (option) => {
        let state = this.state;
        switch(option) {
            case 'Note': 
                state.note = !state.note;
                break;
            case 'Howto':
                state.howto = !state.howto;
                break;
            case 'Four':
                state.over4 = !state.over4;
                break; 
            case 'Search':
                document.getElementsByClassName('testing-space')[0].innerText = 'Loading';
                optimize(state.searchOption, state.equipmentOptions, state.equipped, this.props.runes, this.props.enchants, this.props.stats, this.state.sortedEquipment, 0);             
                break;
            default: 
                console.log('uhhh')
        }
        this.setState({...state});
    }

    handleChange = (e, option) => {
        let state = this.state;
        let q = e.target.value;
        switch(option) {
            case 'SearchOption':
                state.searchOption = q;
                break;
            case 'EquipmentOption':
                //first make sure its not already a selected option
                if (state.equipmentOptions.includes(q)) {
                    let x = state.equipmentOptions.indexOf(q);
                    state.equipmentOptions.splice(x, 1);
                } else {
                      //make sure its not over 4 selected unless over4 is true
                       //add it to selected items
                    if (state.equipmentOptions.length < 4) {
                        state.equipmentOptions.push(e.target.value);
                    }
                    else if (state.over4) {
                        state.equipmentOptions.push(e.target.value);
                    }
                }
                let elements = document.getElementById("equipment-options").options;
                let total = 1;
                for (let i = 0; i < elements.length; i++) {
                    if (this.state.equipmentOptions.includes(elements[i].value)) {
                        if (elements[i].value !== 'mounts') {
                            total *= this.state.sortedEquipment[elements[i].value].length;
                        } else {
                            total *= this.props.mounts.length;
                        }
                        
                    }
                    elements[i].selected = false;
                }
                state.numberOfOptions = total;
                document.getElementsByClassName('testing-space')[0].innerText = 'Waiting' ;
                break;
                
            default: 
                console.log('uhhh-2')
        }
        this.setState({...state});
    }

    updateInputValue = (event) => {

    }

    handleOptimizedEquipment = (dataObject) => {
        let state = this.state;
        state.optimized = true; 
        state.optimizedEquipment = dataObject;
        this.setState(state);
        window.optimizeEquipment = this;
    }

    render() {
        let openNote = {display: 'none'};
        let openHowto = {display: 'none'};

        if (this.state.note) {
            openNote = {display: 'block'};
        }
        if (this.state.howto) {
            openHowto = { display: 'block'};
        }
        
        return (<div className="optimizer-window"  style={this.props.styling}>
            <span className="x-close" onClick={() => {this.props.openClose('Optimizer')}}>x</span>
            This is experimental. Read the notice.
            <OptimizerNotice styleProp={openNote} clickHandler={this.handleButtonClick} title={'Notice/Help'} note={this.state.note} />
            <OptimizerNotice styleProp={openHowto} clickHandler={this.handleButtonClick} title={'How To Use'} note={this.state.howto} over4={this.state.over4}/>

            <section className="dropdown">
                <form>
                    <label htmlFor="search-options">Search For:</label><br />
                    <select id="search-options" className="search-options" name="search-options" onChange={(e) => {
                        this.handleChange(e, 'SearchOption')
                    }}>
                        <option value="none">None</option>
                        {
                            this.state.searchOptions.map((x) => {
                                return (
                                <option value={x.option} key={x.id}>{x.key}</option>
                                )
                            })
                        }
                    </select>
                    <br />

                    
                </form>
            </section>
            <section className="dropdown">
                <form>
                    <label htmlFor="equipment-options">Search For:</label><br />
                    <select id="equipment-options" className="equipment-options" name="equipment-options" onChange={(e) => {
                        this.handleChange(e, 'EquipmentOption')
                    }} multiple>
                        {
                            change.map((x, i) => {
                                let styling;


                                this.state.equipmentOptions.includes(x.reference) ? styling = 'force-color-dropdown'  : styling = ''; 
                                if (x.reference !== 'accessories') {
                                    return (
                                        <option className={styling} value={x.reference} key={i}>{x.slot.toUpperCase()}</option>
                                    )
                                } 
                                return null;
                            })
                        }
                    </select>
                    <br />
                    <br />
                    
                </form>
            </section>
            <section className="counter">
                Total Number of Combinations To Search : {this.state.numberOfOptions}
            </section>
            <section className="submit">
                <button className={`notice-button notice-button-${this.state.howto}`}  onClick={() => {
                    this.handleButtonClick('Search');
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
                    this.handleButtonClick('Equip New Items');
                }}></button>
            </section>
            
        </div>)
    }
};

OptimizerWindow.propTypes = {
  equipped: PropTypes.object.isRequired,
  openClose: PropTypes.func.isRequired,
  styling: PropTypes.any.isRequired,
  runes: PropTypes.array.isRequired,
  enchants: PropTypes.object.isRequired

}
