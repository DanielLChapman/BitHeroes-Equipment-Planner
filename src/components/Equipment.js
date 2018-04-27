import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Equipment extends Component {

	constructor (props) {
		super(props);
	}

	render() {
		return (	
			<div className="empty-div">
				<button className="by-set by-main-buttons"></button>
				<ul className="by-set-reveal" >
					{
						Object.keys(this.props.sets).map((x) => {
							return <li className="by-sets-names" key={x}>
										<span className="click-on-this">{this.props.sets[x].name}</span>
										<ul className={`by-set-reveal-sub-${x} by-set-reveal-sub`}>
											{
												Object.keys(this.props.sets[x].items).map((y) => {
													return <li key={y}>{this.props.sets[x].items[y].name}</li>
												})
											}
										</ul>
									</li>

						})
					}
				</ul>
				<button className="by-mythic by-main-buttons"></button>
				<ul className="by-mythic-reveal">
					{
						Object.keys(this.props.equipment).map((x) => {
							if (this.props.equipment[x].type === "mythic") {
								return <li key={x}>{this.props.equipment[x].name}</li>
							}
						})
					}
				</ul>
				<button className="by-slot by-main-buttons"></button>
				<ul className="by-slot-reveal">
					<li className="by-slot-types by-slots-mainhand">
						<span>Mainhands</span>
						<ul class="by-slot-types-reveal by-slots-mainhand-reveal">
							{
								Object.keys(this.props.sortedEquipment.mainhands).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.mainhands[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-offhand">
						<span>Offhands</span>
						<ul class="by-slot-types-reveal by-slots-offhand-reveal">
							{
								Object.keys(this.props.sortedEquipment.offhands).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.offhands[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-body">
						<span>Bodies</span>
						<ul class="by-slot-types-reveal by-slots-body-reveal">
							{
								Object.keys(this.props.sortedEquipment.bodies).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.bodies[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-head">
						<span>Heads</span>
						<ul class="by-slot-types-reveal by-slots-head-reveal">
							{
								Object.keys(this.props.sortedEquipment.heads).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.heads[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-necklace">
						<span>Necklaces</span>
						<ul class="by-slot-types-reveal by-slots-necklace-reveal">
							{
								Object.keys(this.props.sortedEquipment.necklaces).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.necklaces[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-ring">
						<span>Rings</span>
						<ul class="by-slot-types-reveal by-slots-ring-reveal">
							{
								Object.keys(this.props.sortedEquipment.rings).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.rings[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-pet">
						<span>Pets</span>
						<ul class="by-slot-types-reveal by-slots-pet-reveal">
							{
								Object.keys(this.props.sortedEquipment.pets).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.pets[x].name}</li>
								})
							}
						</ul>
					</li>
					<li className="by-slot-types by-slots-accessory">
						<span>Acccessories</span>
						<ul class="by-slot-types-reveal by-slots-accessory-reveal">
							{
								Object.keys(this.props.sortedEquipment.accessories).map((x) => {
									return <li key={x}>{this.props.sortedEquipment.accessories[x].name}</li>
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
	sortedEquipment: PropTypes.object.isRequired
}