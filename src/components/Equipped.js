import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Equipped extends Component {

	render() {
		return (
			<React.Fragment>
				<h1>Hey</h1>
				{
					Object.keys(this.props.equipped).map((x) => {
						return <h3 key={x}>{x}</h3>
					})
				}
			</React.Fragment>
		)
	}
}

Equipped.propTypes = {
	equipped: PropTypes.object.isRequired
};