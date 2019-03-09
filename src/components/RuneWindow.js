import React, { Component } from 'react';
import PropTypes from "prop-types";

import {runeTypes} from '../stats';

export default class RuneWindow extends Component {

	constructor(props) {
		super(props);
		this.state = {
            runeSlot1: 'None',
            runeSlot2: 'None',
            runeSlot3: 'None',
            runeSlot4: 'None'
		};
    }
    handleChange = (event) => {
        let state = this.state;
        let slot = event.currentTarget.getAttribute('selector');
        switch(slot) {
            case "1":
                state.runeSlot1 = event.target.value;
                break;
            case "2":
                state.runeSlot2 = event.target.value;
                break;
            case "3":
                state.runeSlot3 = event.target.value;
                break;
            case "4":
                state.runeSlot4 = event.target.value;
                break;
            default:
            break;
        }
        this.setState({...state});
    }

    
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.runes !== undefined && nextProps.runes.length === 4) {
            let runes = nextProps.runes;
            let state = this.state;

            state.runeSlot1 = runes[0].title;
            state.runeSlot2 = runes[1].title;
            state.runeSlot3 = runes[2].title;
            state.runeSlot4 = runes[3].title;
            
            this.setState({...state});
        }
        
    }

	render() {

		return (	
			<div className="rune-div" style={this.props.styling}>
                <span className="x-close" onClick={() => {this.props.openClose('Runes')}}>x</span>
                <h3>Runes: </h3>
                <label htmlFor="runeSlot1" className="custom-select">
                <select value={this.state.runeSlot1} selector="1" onChange={this.handleChange} name="runeSlot1">
                    {
                        Object.keys(runeTypes).map((x) => {
                            return <option
                                    value={runeTypes[x].title}
                                    key={x}
                                    >
                                    {runeTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="runeSlot2" className="custom-select">
                <select value={this.state.runeSlot2} selector="2" onChange={this.handleChange}>
                    {
                        Object.keys(runeTypes).map((x) => {
                            return <option
                                    value={runeTypes[x].title}
                                    key={x}
                                    >
                                    {runeTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="runeSlot3" className="custom-select">
                <select value={this.state.runeSlot3} selector="3" onChange={this.handleChange}>
                    {
                        Object.keys(runeTypes).map((x) => {
                            return <option
                                    value={runeTypes[x].title}
                                    key={x}
                                    >
                                    {runeTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="runeSlot4" className="custom-select">
                <select value={this.state.runeSlot4} selector="4" onChange={this.handleChange}>
                    {
                        Object.keys(runeTypes).map((x) => {
                            return <option
                                    value={runeTypes[x].title}
                                    key={x}
                                    >
                                    {runeTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
				<button onClick={() => {this.props.equipRunes([this.state.runeSlot1, this.state.runeSlot2, this.state.runeSlot3, this.state.runeSlot4])}}>
                    Equip Runes
                </button>
			</div>
		)
	}
}

RuneWindow.propTypes = {
    openClose: PropTypes.func.isRequired,
	runes: PropTypes.array.isRequired,
	equipRunes: PropTypes.func.isRequired
}