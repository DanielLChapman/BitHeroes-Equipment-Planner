import React from 'react';
import PropTypes from "prop-types";
import { NoEmitOnErrorsPlugin } from 'webpack';

export default class OptimizerWindow extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            equipped: {},
            note: false
		};
    }

    handleChange = (event) => {
        let state = this.state;
        switch(event) {
            case 'Note': 
                state.note = !state.note;
                break;
            default: 
                console.log('uhhh')
        }
        this.setState({...state});
    }

    updateInputValue = (event) => {

    }

    static getDerivedStateFromProps(props, state) {
        if (typeof props.equipped !== undefined ) {
            return {equipped: props.equipped}
        };
    }
    
    render() {
        let openNote = {display: 'none'};
        
        return (<div className="optimizer-window"  style={this.props.styling}>
            <span className="x-close" onClick={() => {this.props.openClose('Optimizer')}}>x</span>
            <button className="notice-button" onClick={() => {
                this.handleChange('Note');
            }}>Notice</button>
            <section className="notes">
                Test Test Test Test Test Test Test Test Test Test<br />
                Test Test Test Test Test Test Test Test Test Test<br />
            </section>
        </div>)
    }
};

OptimizerWindow.propTypes = {
  equipped: PropTypes.object.isRequired,
  openClose: PropTypes.func.isRequired,
  styling: PropTypes.any.isRequired,
  equipment: PropTypes.object.isRequired

}
