import React from 'react';
import PropTypes from "prop-types";
import {searchOptions, change} from '../investigation';

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
		};
    }

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
                for (let i = 0; i < elements.length; i++) {
                    elements[i].selected = false;
                }
                break;
            default: 
                console.log('uhhh-2')
        }
        this.setState({...state});
    }

    updateInputValue = (event) => {

    }

    static getDerivedStateFromProps(props, state) {
        if (typeof props.equipped !== undefined ) {
            return {equipped: props.equipped}
        };
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
            <button className={`notice-button notice-button-${this.state.note}`} onClick={() => {
                this.handleButtonClick('Note');
            }}>Notice/Help</button>
            <section className="notes" style={openNote}>
                First, this is experimental. This will loop through all possible equipment options with the slots selected below, searching for the highest stat value selected below. <br /><br />
                Some of the equipment had to be normalized to a value that may not be accurate (like moon collage with weighted chances).<br /><br />
                Other equipment doesn't even affect these values because I wasn't sure of how to add it to the calculations (like Necrosis)<br /><br />
                Then some items are only for under or over X % of health and not all the time, but those conditional values are calculated in (like divinity set) so it wouldn't be for every hit<br /><br />
                These calculations are from Link's Excel Sheet with Elemental Effects added into the Calcualtions.<br /><br />
                Each elemental damage reduction is reduced to 75% before combined damage reduction per element<br /><br />
                Any other questions, hit me up on discord RustyPeach#6491
            </section>
            <button className={`notice-button notice-button-${this.state.howto}`}  onClick={() => {
                this.handleButtonClick('Howto');
            }}>How To Use</button>
            <section className="notes" style={openHowto}>
                First, this is based on what is currently equipped in the application, including runes and enchants. <br /> 
                Please make sure you have everything equipped that you will want to keep the same. If a slot is empty and not selected below, it will stay empty. <br /><br />
                Second, the number of options available is extreme. Before runes and enchants are added in, there are millions of combinations avaiable. <br />
                Because of this, this will be limited to a maximum of 4 equipment choices. If you want to use more than 4 slots, then its at your own risk. <br />
                <button className={`notice-button notice-button-${this.state.over4}`}  onClick={() => {
                    this.handleButtonClick('Four');
                }}>{
                    !this.state.over4 ? 'Click here to allow more than 4' : '4 or more allowed'
                }</button>
                <br /><br />
                Runes and Enchants haven't been added in yet, also planning on adding the option to ignore sets.<br /><br />
                <b>1.</b> Select which option you want to search for. If nothing is selected, it wont run. <br />
                <b>2.</b> Select which slots you want to search with, these will be what slots are changed <br />
                <b>3.</b> Sit and wait, 4 slots can easily get above 1 million options so this might take some processing time <br /><br />
            </section>
            <section className="dropdown">
                <form>
                    <label htmlFor="search-options">Search For:</label><br />
                    <select id="search-options" className="search-options" name="search-options" onChange={(e) => {
                        this.handleChange(e, 'SearchOption')
                    }}>
                        {
                            this.state.searchOptions.map((x) => {
                                return (
                                <option value={x.option} key={x.id}>{x.key}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    {this.state.searchOption}
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

                                return (
                                    <option className={styling} value={x.reference} key={i}>{x.slot.toUpperCase()}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />
                    
                </form>
            </section>
        </div>)
    }
};

OptimizerWindow.propTypes = {
  equipped: PropTypes.object.isRequired,
  openClose: PropTypes.func.isRequired,
  styling: PropTypes.any.isRequired,
  equipment: PropTypes.object.isRequired

}
