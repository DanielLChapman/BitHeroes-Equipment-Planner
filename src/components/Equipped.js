import React, { Component } from 'react';
import PropTypes from "prop-types";

import EquippedView from './EquippedView';

export default class Equipped extends Component {

	render() {
		return (
			<React.Fragment>
				<h1>Hey</h1>
				{
					Object.keys(this.props.equipped).map((x) => {
						return (
							<div className={`equipped-container equpped-container-${x}`} 
								 key={x} 
								 onClick={() => {this.props.removeItem(x)}}>
								<EquippedView equipped={this.props.equipped[x]} />
							</div>
						)
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