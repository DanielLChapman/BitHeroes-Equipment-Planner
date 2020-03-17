import React, { Component } from 'react';
import PropTypes from "prop-types";

import {convertName} from '../functions';

export const types = [
	{l: 'mainhands', c: 'Mainhands', np: 'mainhand'},
	{l: 'offhands', c: 'Offhands', np: 'offhand'},
	{l: 'heads', c: 'Heads', np: 'head'},
	{l: 'bodies', c: 'Bodies', np: 'offhand'},
	{l: 'necklaces', c: 'Necklaces', np: 'necklace'},
	{l: 'rings', c: 'Rings', np: 'ring'},
	{l: 'accessories', c: 'Accessories', np: 'accessory'},
	{l: 'pets', c: 'Pets', np: 'pet'},
];

export default class Equipment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mythicReveal: false,
			setReveal: false,
			slotReveal: false,
		};
	}
	static getDerivedStateFromProps(props, state) {
		return {mythicReveal: props.mythicReveal, setReveal: props.setReveal, slotReveal: props.slotReveal };
	}

	toggleState = (item) => {
		this.props.handleOpenClose(item);
		//let state = this.state;
		//state[item] = !this.state[item];
		//this.setState({...state});
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
														//if (this.props.sets[x].name === 'Apocalypse') {
														//	console.log({q, i});
														//}
														return <p key={`${q}-i`}>{q}/{this.props.sets[x].items.length}: {this.props.sets[x].setBonuses[q]}</p>
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
					{/* mounts have special aspects */}
					{
						types.map((y, i) => (
							
							<li key={i} className={`by-slot-types by-slots-${y.np}`} id={`slot-${y.np}`}>
								<span className="item-name" >{y.c}</span>
								<ul className={`by-slot-types-reveal by-slots-${y.np}-reveal`}>
									{
										Object.keys(this.props.sortedEquipment[y.l]).map((x) => {
											return <li 
													className={`by-slots-type-${this.props.sortedEquipment[y.l][x].type}`} 
													key={x} 
													onClick={() => {this.props.equipItem(x)}}>
													{this.props.sortedEquipment[y.l][x].name}
													</li>
										})
									}
								</ul>
							</li>
						))
					}
					<li className="by-slot-types by-slots-mount">
						<span className="item-name" >Mounts</span>
						<ul className="by-slot-types-reveal by-slots-mount-reveal" id="slot-mount">
							{
								Object.keys(this.props.mounts).map((x) => {
									return <li
											className={`by-slots-type-pet-legendary`} 
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