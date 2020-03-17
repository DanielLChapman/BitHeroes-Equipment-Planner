import React from 'react';
import PropTypes from "prop-types";
import {equipment, sortEquipment} from '../equipment';
import {searchOptions, change} from '../investigation';
import OptimizerNotice from './Optimizer/OptimizerNotice';
import OptimizerDropdown from './Optimizer/OptimizerDropdown';
import OptimizerFunction from './Optimizer/OptimizerFunction';

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
                break;
                
            default: 
                console.log('uhhh-2')
        }
        this.setState({...state});
    }

    updateInputValue = (event) => {

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
            This is experimental and still being worked on. Read the notice.
            <OptimizerNotice styleProp={openNote} clickHandler={this.handleButtonClick} title={'Notice/Help'} note={this.state.note} />
            <OptimizerNotice styleProp={openHowto} clickHandler={this.handleButtonClick} title={'How To Use'} note={this.state.howto} over4={this.state.over4}/>

            <OptimizerDropdown title={'Search For: '} handleChange={this.handleChange} switchOperator={'SearchOption'} multiple={false} data={this.state.searchOptions} special={false} />
           
           {/* Special Rendering, errors when trying to get it into dropdown because of equipmentOptions */}
            <section className="dropdown">
                <form>
                    <label htmlFor="equipment-options">Which Slots To Change</label><br />
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

            <OptimizerFunction 
                clickHandler={this.handleButtonClick} 
                searchOption={this.state.searchOption} 
                numberOfOptions={this.state.numberOfOptions} 
                stats={this.props.stats}
                currentlyEquipped={this.state.equipped}
                enchants={this.props.enchants}
                runes={this.props.runes}
                options={this.state.equipmentOptions}
                optimizeEquip={this.props.optimizeEquip}
                 />
        
            
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
