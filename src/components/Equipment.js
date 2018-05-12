import React, { Component } from 'react';
import PropTypes from "prop-types";

import {convertName} from '../functions';

export default class Equipment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mythicReveal: false,
			setReveal: false,
			slotReveal: false,
		};
	}

	toggleState = (item) => {
		let state = this.state;
		state[item] = !this.state[item];
		this.setState({...state});
	}

	render() {
		var setRevealStyling = {'display': 'none'},
			mythicRevealStyling = {'display': 'none'},
			slotRevealStyling = {'display': 'none'};
		if (this.state.setReveal) {
			setRevealStyling = {'display': 'block'};
		}
		if (this.state.mythicReveal) {
			mythicRevealStyling = {'display': 'block'};
		}
		if (this.state.slotReveal) {
			slotRevealStyling = {'display': 'block'};
		}
		return (	
			<div className="empty-div">
				<button className="by-set by-main-buttons" onClick={() => {
					this.toggleState('setReveal')
				}}>Open Sets</button>
				<ul className="by-set-reveal" style={setRevealStyling}>
					{
						Object.keys(this.props.sets).map((x) => {
							return <li className="by-sets-names" key={x}>
										<span className="click-on-this item-name">{this.props.sets[x].name}</span>
										<div className="set-information">
											<span className="set-location">Found: {this.props.sets[x].location}</span>
											<div className="set-bonuses">
												{
													Object.keys(this.props.sets[x].setBonuses).map((q, i) => {
														return <p key={`${q}-i`}>{i + 2}/{this.props.sets[x].items.length}: {this.props.sets[x].setBonuses[q]}</p>
													})
												}
											</div>
										</div>
										<ul className={`by-set-reveal-sub-${x} by-set-reveal-sub`}>
											{
												Object.keys(this.props.sets[x].items).map((y) => {
													var returnVal;
													if (typeof this.props.sets[x].items[y] === 'string') {
														returnVal = convertName(this.props.sets[x].items[y]);
													} else {
														returnVal = convertName(this.props.sets[x].items[y].name);
													}
													
													return <li key={y} onClick={() => {this.props.equipItem(returnVal)}}>
															<span className="left-span-name">{this.props.sets[x].items[y].name}</span>
															<span className="right-span-slot">{this.props.sets[x].items[y].slot}</span>
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
						Object.keys(this.props.mythics).map((x) => {
							return <li key={x} onClick={() => {this.props.equipItem(x)}}>
										<span className="item-name">{this.props.mythics[x].name}</span>
										<br />
										<span className="mythic-slot">{this.props.mythics[x].slot}</span>
										<br />
										<span className="mythic-location">Found: {this.props.mythics[x].location}</span>
										<div className="mythic-bonus">
											{this.props.mythics[x].effect}
										</div>
									</li>

						})
					}
				</ul>
				<button className="by-slot by-main-buttons" onClick={() => {
					this.toggleState('slotReveal')
				}}>Open Slots</button>
				<ul className="by-slot-reveal" style={slotRevealStyling}>
					<li className="by-slot-types by-slots-mainhand">
						<span className="item-name" >Mainhands</span>
						<ul className="by-slot-types-reveal by-slots-mainhand-reveal">
							{
								Object.keys(this.props.sortedEquipment.mainhands).map((x) => {
									var returnVal;
										if (typeof this.props.sortedEquipment.mainhands[x] === 'string') {
											returnVal = convertName(this.props.sortedEquipment.mainhands[x]);
										} else {
											returnVal = convertName(this.props.sortedEquipment.mainhands[x].name);
									}
									return <li
											className={`by-slots-type-${this.props.sortedEquipment.mainhands[x].type}`} 
											key={x} 
											onClick={() => {this.props.equipItem(returnVal)}}>
											{this.props.sortedEquipment.mainhands[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-offhand">
						<span className="item-name" >Offhands</span>
						<ul className="by-slot-types-reveal by-slots-offhand-reveal">
							{
								Object.keys(this.props.sortedEquipment.offhands).map((x) => {
									return <li 
											className={`by-slots-type-${this.props.sortedEquipment.offhands[x].type}`} 
											key={x} 
											onClick={() => {this.props.equipItem(x)}}>
											{this.props.sortedEquipment.offhands[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-body">
						<span className="item-name" >Bodies</span>
						<ul className="by-slot-types-reveal by-slots-body-reveal">
							{
								Object.keys(this.props.sortedEquipment.bodies).map((x) => {
									return <li
									 		className={`by-slots-type-${this.props.sortedEquipment.bodies[x].type}`}  
									 		key={x} 
									 		onClick={() => {this.props.equipItem(x)}}>
									 		{this.props.sortedEquipment.bodies[x].name}
									 		</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-head">
						<span className="item-name" >Heads</span>
						<ul className="by-slot-types-reveal by-slots-head-reveal">
							{
								Object.keys(this.props.sortedEquipment.heads).map((x) => {
									return <li 
											className={`by-slots-type-${this.props.sortedEquipment.heads[x].type}`}  
											key={x} 
											onClick={() => {this.props.equipItem(x)}}>
											{this.props.sortedEquipment.heads[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-necklace">
						<span className="item-name" >Necklaces</span>
						<ul className="by-slot-types-reveal by-slots-necklace-reveal">
							{
								Object.keys(this.props.sortedEquipment.necklaces).map((x) => {
									return <li 
											className={`by-slots-type-${this.props.sortedEquipment.necklaces[x].type}`} 
											key={x} 
											onClick={() => {this.props.equipItem(x)}}>
											{this.props.sortedEquipment.necklaces[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-ring">
						<span className="item-name" >Rings</span>
						<ul className="by-slot-types-reveal by-slots-ring-reveal">
							{
								Object.keys(this.props.sortedEquipment.rings).map((x) => {
									return <li 
											className={`by-slots-type-${this.props.sortedEquipment.rings[x].type}`} 
											key={x} onClick={() => {this.props.equipItem(x)}}>
											{this.props.sortedEquipment.rings[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-pet">
						<span className="item-name" >Pets</span>
						<ul className="by-slot-types-reveal by-slots-pet-reveal">
							{
								Object.keys(this.props.sortedEquipment.pets).map((x) => {
									return <li
											className={`by-slots-type-pet-${this.props.sortedEquipment.pets[x].type}`} 
											key={x} 
											onClick={() => {this.props.equipItem(x)}}>
											{this.props.sortedEquipment.pets[x].name}
											</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-accessory">
						<span className="item-name" >Acccessories</span>
						<ul className="by-slot-types-reveal by-slots-accessory-reveal">
							{
								Object.keys(this.props.sortedEquipment.accessories).map((x) => {
									return <li
											className={`by-slots-type-pet-${this.props.sortedEquipment.accessories[x].type}`} 
									 		key={x} 
									 		onClick={() => {this.props.equipItem(x)}}>
									 		{this.props.sortedEquipment.accessories[x].name}
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