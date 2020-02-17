import React from 'react';
import PropTypes from "prop-types";
import {searchOptions} from '../investigation';

export default class OptimizerWindow extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            equipped: {},
            note: false,
            howto: false,
            searchOptions: searchOptions,
		};
    }

    handleChange = (event) => {
        let state = this.state;
        switch(event) {
            case 'Note': 
                state.note = !state.note;
                break;
            case 'Howto':
                state.howto = !state.howto;
                break;
            default: 
                console.log('uhhh')
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
                this.handleChange('Note');
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
                this.handleChange('Howto');
            }}>How To Use</button>
            <section className="notes" style={openHowto}>
                First, this is based on what is currently equipped in the application, including runes and enchants. <br /> 
                Please make sure you have everything equipped that you will want to keep the same. If a slot is empty and not selected below, it will stay empty. <br /><br />
                Second, the number of options available is extreme. Before runes and enchants are added in, there are millions of combinations avaiable. <br />
                Because of this, this will be limited to a maximum of 4 equipment choices. <br /><br />
                Runes and Enchants haven't been added in yet, also planning on adding the option to ignore sets.<br /><br />
                <b>1.</b> Select which option you want to search for. If nothing is selected, it wont run. <br />
                <b>2.</b> Select which slots you want to search with, these will be what slots are changed <br />
                <b>3.</b> Sit and wait, 4 slots can easily get above 1 million options so this might take some processing time <br />
            </section>
            <section className="dropdown">
                <form>
                    <label for="search-options">Search For:</label>
                    <select id="search-options" className="search-options" name="search-options" onChange={(e) => {
                        alert(e.target.value);
                    }}>
                        {
                            this.state.searchOptions.map((x) => {
                                return (
                                <option value={x.option} key={x.id}>{x.key}</option>
                                )
                            })
                        }
                    </select>
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
