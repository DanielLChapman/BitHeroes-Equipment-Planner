import React, { Component } from 'react';
import PropTypes from "prop-types";

import {enchantTypes} from '../stats';


export default class RuneWindow extends Component {

	constructor(props) {
		super(props);
		this.state = {
            enchantSlot1: {
                slot1: 'None',
                slot2: 'None'
            }, 
            enchantSlot2:  {
                slot1: 'None',
                slot2: 'None'
            }, enchantSlot3:  {
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
    }

    handleChange = (event) => {
        let state = this.state;
        let enchant = "enchantSlot" + event.currentTarget.getAttribute('enchantlevel');
        let slot =  "slot"+parseInt(event.currentTarget.getAttribute('selector'), 10);
        

        state[enchant][slot] = event.currentTarget.value;
        if (state[enchant]['slot1'] === state[enchant]['slot2']) {
            state[enchant]['slot2'] = 'None';
        }

        this.setState({...state});
    }

    
    componentWillReceiveProps(nextProps) {

        if (typeof nextProps.enchants !== undefined && Object.keys(nextProps.enchants).length === 6) {
            let enchants = nextProps.enchants;
            let state = this.state;

            state = {
                enchantSlot1: {
                    slot1: enchants['enchantSlot1']['slot1'].title,
                    slot2: enchants['enchantSlot1']['slot2'].title
                }, 
                enchantSlot2:  {
                    slot1: enchants['enchantSlot2']['slot1'].title,
                    slot2: enchants['enchantSlot2']['slot2'].title
                }, enchantSlot3:  {
                    slot1: enchants['enchantSlot3']['slot1'].title,
                    slot2: enchants['enchantSlot3']['slot2'].title
                }, enchantSlot4: {
                    slot1: enchants['enchantSlot4']['slot1'].title,
                    slot2: enchants['enchantSlot4']['slot2'].title
                }, enchantSlot5: {
                    slot1: enchants['enchantSlot5']['slot1'].title,
                    slot2: enchants['enchantSlot5']['slot2'].title
                }, enchantSlot6: {
                    slot1: enchants['enchantSlot6']['slot1'].title,
                    slot2: enchants['enchantSlot6']['slot2'].title
                }
            }
            this.setState({...state});
        }
        
    };

    updateState = () => {

        this.props.equipEnchants(this.state);
    }

	render() {

		return (	
			<div className="enchant-div" style={this.props.styling}>
                <span className="x-close" onClick={() => {this.props.openClose('Enchants')}}>x</span>
                <h3>Enchant Slot 1: </h3>
                <label htmlFor="enchantSlot1" className="custom-select">
                <select value={this.state.enchantSlot1.slot1} enchantlevel="1" selector="1" onChange={this.handleChange} name="enchantSlot1">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot2" className="custom-select">
                <select value={this.state.enchantSlot1.slot2} enchantlevel="1" selector="2" onChange={this.handleChange} name="enchantSlot2">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />
                <h3>Enchant Slot 2: </h3>
                <label htmlFor="enchantSlot3" className="custom-select">
                <select value={this.state.enchantSlot2.slot1} enchantlevel="2" selector="1" onChange={this.handleChange} name="enchantSlot3">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot4" className="custom-select">
                <select value={this.state.enchantSlot2.slot2} enchantlevel="2" selector="2" onChange={this.handleChange} name="enchantSlot4">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />
                <h3>Enchant Slot 3: </h3>
                <label htmlFor="enchantSlot5" className="custom-select">
                <select value={this.state.enchantSlot3.slot1} enchantlevel="3" selector="1" onChange={this.handleChange} name="enchantSlot5">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot6" className="custom-select">
                <select value={this.state.enchantSlot3.slot2} enchantlevel="3" selector="2" onChange={this.handleChange} name="enchantSlot6">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />
                <h3>Enchant Slot 4: </h3>
                <label htmlFor="enchantSlot1" className="custom-select">
                <select value={this.state.enchantSlot4.slot1} enchantlevel="4" selector="1" onChange={this.handleChange} name="enchantSlot1">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot2" className="custom-select">
                <select value={this.state.enchantSlot4.slot2} enchantlevel="4" selector="2" onChange={this.handleChange} name="enchantSlot2">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />
                <h3>Enchant Slot 5: </h3>
                <label htmlFor="enchantSlot3" className="custom-select">
                <select value={this.state.enchantSlot5.slot1} enchantlevel="5" selector="1" onChange={this.handleChange} name="enchantSlot3">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot4" className="custom-select">
                <select value={this.state.enchantSlot5.slot2} enchantlevel="5" selector="2" onChange={this.handleChange} name="enchantSlot4">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />
                <h3>Enchant Slot 6: </h3>
                <label htmlFor="enchantSlot5" className="custom-select">
                <select value={this.state.enchantSlot6.slot1} enchantlevel="6" selector="1" onChange={this.handleChange} name="enchantSlot5">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <label htmlFor="enchantSlot6" className="custom-select">
                <select value={this.state.enchantSlot6.slot2} enchantlevel="6" selector="2" onChange={this.handleChange} name="enchantSlot6">
                    {
                        Object.keys(enchantTypes).map((x) => {
                            return <option
                                    value={enchantTypes[x].title}
                                    key={x}
                                    >
                                    {enchantTypes[x].title}
                                    </option>
                        })
					}
                </select>
                </label>
                <br />



				<button onClick={() => this.updateState()}>
                    Equip Enchants
                </button>
			</div>
		)
	}
}

RuneWindow.propTypes = {
    openClose: PropTypes.func.isRequired,
	enchants: PropTypes.object.isRequired,
	equipEnchants: PropTypes.func.isRequired
}