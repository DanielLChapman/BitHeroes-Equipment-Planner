import React, { Component } from 'react';

class Filtering extends Component {
    render() {
        return (
            <>
                <span className="filter-button" onClick={(e) => {
						this.props.bySlotFiltering(e, 'styling');
				}}>Filters {this.props.equipmentFiltering.filteringReveal ? "↑" : "↓" }</span>
					<section className="by-slot-filtering" style={this.props.bySlotFilteringStyling}>

						{/*

							2. Need drop down for tiers
							3. Need search bar for searching
								a. Maybe check box for search bar

							if any are active, change sorted equipment to filtered equipment

						*/}
						'Open Slots' Only : <br />
						<br />
						<label>
						Mythics Only: 
						<input
							name="mythicsOnly"
							type="checkbox"
							checked={this.props.equipmentFiltering.mythicsOnly}
							onChange={(e) => {
								this.props.bySlotFiltering(e, 'mythicsOnly');
							} }/>
						</label>
						<br />
						<label>
						Sets Only: 
						<input
							name="setsOnly"
							type="checkbox"
							checked={this.props.equipmentFiltering.setsOnly}
							onChange={(e) => {
								this.props.bySlotFiltering(e, 'setsOnly');
							} }/>
						</label>
						<br /><br />
						All Categories:
						<div className="filtering-tiers">
							<form className="tier-options-form" >
								<label htmlFor="equipment-options">Included Tiers: </label><br />
                                <section className="equipment-options-by-tiers-checkboxes">

                                
                                {
                                    [1, 2, 5, 6, 7, 8, 9, 10, 11, 12].map((x, i) => {
                                        if (x === 1) {
                                            return (
                                                <label key={i}>
                                                Invasion / Expedition &nbsp;
                                                <input
                                                    name="invasion-checkbox"
                                                    type="checkbox"
                                                    value="1"
                                                    checked={this.props.equipmentFiltering.tiers.includes(x)}
                                                    onChange={(e) => {
                                                        this.props.bySlotFiltering(e, 'tiers')
                                                    }} />
                                                </label>
                                            )
                                        }
                                        if (x === 2) {
                                            return (
                                                <label key={i}>
                                                Ancients &nbsp;
                                                <input
                                                    name="invasion-checkbox"
                                                    type="checkbox"
                                                    value="2"
                                                    checked={this.props.equipmentFiltering.tiers.includes(x)}
                                                    onChange={(e) => {
                                                        this.props.bySlotFiltering(e, 'tiers')
                                                    }} />
                                                </label>
                                            )
                                        }
                                        return (
                                            <label key={i}>
                                                Tier: {x} &nbsp;
                                                <input
                                                    name="invasion-checkbox"
                                                    type="checkbox"
                                                    value={x}
                                                    checked={this.props.equipmentFiltering.tiers.includes(x)}
                                                    onChange={(e) => {
                                                        this.props.bySlotFiltering(e, 'tiers')
                                                    }} />
                                            </label>
                                            
                                        )
                                    })
                                }

                                </section>
                                {/* 
								<select id="tier-options" className="equipment-options tier-options" name="tier-options" onChange={(e) => {
									this.props.bySlotFiltering(e, 'tiers')
								}} multiple>
									{
										[1, 2, 5, 6, 7, 8, 9, 10, 11, 12].map((x, i) => {
											let styling;

											this.props.equipmentFiltering.tiers.includes(x) ? styling = '' : styling = 'force-color-dropdown'; 
											if (x === 1) {
												return (
													<option className={styling} value={x} key={i}>Invasion Expedition</option>
												)
											}
											if (x === 2) {
												return (
													<option className={styling} value={x} key={i}>Ancients</option>
												)
											}
											return (
												<option className={styling} value={x} key={i}>Tier: {x}</option>
											)
										})
									}
								</select>*/}
								
							</form>
						</div>
						<div className="filter-searching">
							<label>
								Information Contains: &nbsp;&nbsp;
								<input type="text" value={this.props.equipmentFiltering.searching} onChange={(e) => {
										this.props.bySlotFiltering(e, 'searching')
									}} />
							</label>
						</div>
						

					</section>
            </>
        );
    }
}

export default Filtering;