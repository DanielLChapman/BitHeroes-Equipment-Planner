import React, { Component } from 'react';
import PropTypes from "prop-types";

import EquippedView from './EquippedView';

export default class Equipped extends Component {

	render() {
		return (
			<React.Fragment>
				{
					Object.keys(this.props.equipped).map((x) => {
						if(this.props.equipped[x].key) {
							return (
								<div className={`equipped-container equpped-container-${x} equipped-${this.props.equipped[x].key}`} 
									 key={x} 
									 onClick={() => {this.props.removeItem(x)}}>
									<EquippedView equipped={this.props.equipped[x]} />
								</div>
							)
						} else {
							return (
								<div className={`equipped-container equpped-container-${x} equipped-${this.props.equipped[x].type}`} 
									 key={x} 
									 onClick={() => {this.props.removeItem(x)}}>
									<EquippedView equipped={this.props.equipped[x]} />
								</div>
							)
						}
					})
				}
			</React.Fragment>
		)
	}
}

Equipped.propTypes = {
	equipped: PropTypes.object.isRequired,
	removeItem: PropTypes.func.isRequired
};