import React, { Component } from 'react';
import PropTypes from "prop-types";

import {convertName} from '../functions';
import {filteringEquipment} from '../equipment';

import Filtering from './Equipment/Filtering';

export const types = [
	{l: 'mainhands', c: 'Mainhands', np: 'mainhand'},
	{l: 'offhands', c: 'Offhands', np: 'offhand'},
	{l: 'heads', c: 'Heads', np: 'head'},
	{l: 'bodies', c: 'Bodies', np: 'body'},
	{l: 'necklaces', c: 'Necklaces', np: 'necklace'},
	{l: 'rings', c: 'Rings', np: 'ring'},
	{l: 'accessories', c: 'Accessories', np: 'accessory'},
	{l: 'pets', c: 'Pets', np: 'pet'},
];

export const tiers = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default class Equipment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mythicReveal: false,
			setReveal: false,
			slotReveal: false,
			sortedEquipment: {},
			sets: {},
			mythics: {},
			equipmentFiltering: {
				filtering: false,
				filteringReveal: false,
				searching: '',
				mythicsOnly: false,
				setsOnly: false,
				tiers: [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
			}
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (state.equipmentFiltering.filtering) {
			let a = filteringEquipment(props.equipment, state.equipmentFiltering, props.sets);

			return {mythicReveal: props.mythicReveal, 
				setReveal: props.setReveal, 
				slotReveal: props.slotReveal, 
				sortedEquipment:a[0],
				mythics: a[1],
				sets: a[3],
				};

		}
		return {mythicReveal: props.mythicReveal, 
			setReveal: props.setReveal, 
			slotReveal: props.slotReveal, 
			sortedEquipment: props.sortedEquipment,
			mythics: props.mythics,
			sets: props.sets};
	}

	toggleState = (item) => {
		this.props.handleOpenClose(item);
	}

	bySlotFiltering = (e, w2C) => {
		let state = this.state;
		let ef = state.equipmentFiltering;

		switch(w2C) {
			case 'styling':
				ef.filteringReveal = !ef.filteringReveal;
				break;
			case 'mythicsOnly':
				ef.mythicsOnly = !ef.mythicsOnly;
				ef.setsOnly = false;
				break;
			case 'setsOnly':
				ef.setsOnly = !ef.setsOnly;
				ef.mythicsOnly = false;
				break;
			case 'tiers':
				let f = parseInt(e.target.value, 10);
				//if its in the area remove it,
				if (![0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].includes(f)) {
					break;
				}
				if (!ef.tiers.includes(f) ) {
					ef.tiers.push(f);
				} else {
					let index = ef.tiers.indexOf(f);
					if (index > -1) {
						ef.tiers.splice(index, 1);
					}
				}
				//otherwise push it
				
				ef.tiers.sort();
				break;
			case 'searching': 
				ef.searching = e.target.value;
				break;
			default: 
				console.log(e)
		}

		//Need a better comparison here to check if anything is being filtered but will work for now
		if (ef.searching === '' &&
		 !ef.mythicsOnly && 
		 !ef.setsOnly && 
		 JSON.stringify(ef.tiers) === JSON.stringify(tiers)) {
			ef.filtering = false; 
		} else {
			ef.filtering = true;
		}

		state.equipmentFiltering = ef;
		
		this.setState({...state});
	}

	render() {
		var setRevealStyling = {'display': 'none'},
			mythicRevealStyling = {'display': 'none'},
			slotRevealStyling = {'display': 'none'},
			bySlotFilteringStyling = {'display': 'none'};

		if (this.state.setReveal) {
			setRevealStyling = {'display': 'block'};
		}
		if (this.state.mythicReveal) {
			mythicRevealStyling = {'display': 'block'};
		}
		if (this.state.slotReveal) {
			slotRevealStyling = {'display': 'block'};
		}
		if (this.state.equipmentFiltering.filteringReveal) {
			bySlotFilteringStyling = {'display': 'block'}
		}

		
		return (	
			<div className="empty-div">
				<Filtering 
					equipmentFiltering={this.state.equipmentFiltering} 
					bySlotFiltering={this.bySlotFiltering}
					bySlotFilteringStyling={bySlotFilteringStyling}
					openSlotStyling={{display: 'block'}}
					/>
				<button className="by-set by-main-buttons" onClick={() => {
					this.toggleState('setReveal')
				}}>Open Sets</button>
				<ul className="by-set-reveal" style={setRevealStyling}>
					{
						Object.keys(this.state.sets).map((x) => {
							return <li className="by-sets-names" key={x}>
										<span className="click-on-this item-name">{this.state.sets[x].name}</span>
										<div className="set-information">
											<span className="set-location">Found: {this.state.sets[x].location}</span>
											<div className="set-bonuses">
												{
													Object.keys(this.state.sets[x].setBonuses).map((q, i) => {
										
														//if (this.props.sets[x].name === 'Apocalypse') {
														//	console.log({q, i});
														//}
														return <p key={`${q}-i`}>{q}/{this.state.sets[x].items.length}: {this.state.sets[x].setBonuses[q]}</p>
													})
												}
											</div>
										</div>
										<ul className={`by-set-reveal-sub-${x} by-set-reveal-sub`}>
											{
												Object.keys(this.state.sets[x].items).map((y) => {
													var returnVal;
													if (typeof this.state.sets[x].items[y] === 'string') {
														returnVal = convertName(this.state.sets[x].items[y]);
													} else {
														returnVal = convertName(this.state.sets[x].items[y].name);
													}
													
													return <li key={y} onClick={() => {this.props.equipItem(returnVal)}}>
															<span className="left-span-name">{this.state.sets[x].items[y].name}</span>
															<span className="right-span-slot">{this.state.sets[x].items[y].slot}</span>
														</li>
												})
											}
										</ul>
									</li>

						})
					}
				</ul>
				<button className="by-mythic by-main-buttons" onClick={() => {
					this.toggleState('mythicReveal')
				}}>Open Mythics</button>
				<ul className="by-mythic-reveal" style={mythicRevealStyling}>
					{
						Object.keys(this.state.mythics).map((x) => {
							return <li key={x} onClick={() => {this.props.equipItem(x)}}>
										<span className="item-name">{this.state.mythics[x].name}</span>
										<br />
										<span className="mythic-slot">{this.state.mythics[x].slot}</span>
										<br />
										<span className="mythic-location">Found: {this.state.mythics[x].location}</span>
										<div className="mythic-bonus">
											{this.state.mythics[x].effect}
										</div>
									</li>

						})
					}
				</ul>
				<button className="by-slot by-main-buttons" onClick={() => {
					this.toggleState('slotReveal')
				}}>Open Slots</button>

				

				<ul className="by-slot-reveal" style={slotRevealStyling}>
					
					{/* mounts have special aspects */}
					{
						types.map((y, i) => {
							
							return (
							
							<li key={i} className={`by-slot-types by-slots-${y.np}`} id={`slot-${y.np}`}>
								<span className="item-name" >{y.c}</span>
								<ul className={`by-slot-types-reveal by-slots-${y.np}-reveal`}>
									{
										Object.keys(this.state.sortedEquipment[y.l]).map((x) => {
											return <li 
													className={`by-slots-type-${this.state.sortedEquipment[y.l][x].type}`} 
													key={x} 
													onClick={() => {this.props.equipItem(x)}}>
													{this.state.sortedEquipment[y.l][x].name}
													</li>
										})
									}
								</ul>
							</li>
						)})
					}
					<li className="by-slot-types by-slots-mount">
						<span className="item-name" >Mounts</span>
						<ul className="by-slot-types-reveal by-slots-mount-reveal" id="slot-mount">
							{
								Object.keys(this.props.mounts).map((x) => {
									return <li
											className={` ${this.props.mounts[x].mythic? 'by-slots-type-mythic': 'by-slots-type-pet-legendary'}`} 
									 		key={x} 
									 		onClick={() => {this.props.equipItem(x)}}>
									 		{this.props.mounts[x].title}
									 		</li>
								})
							}
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

Equipment.propTypes = {
	sets: PropTypes.object.isRequired,
	equipment: PropTypes.object.isRequired,
	sortedEquipment: PropTypes.object.isRequired,
	mythics: PropTypes.object.isRequired,
	equipItem: PropTypes.func.isRequired,
	legendaries: PropTypes.object.isRequired
}