import React from 'react';
import PropTypes from "prop-types";

export default class StatWindow extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            accessoryLevel: 0
		};
    }

    handleChange = (event) => {
        let temp = event.currentTarget.value;
        this.props.modifyAccessoryLevel(temp);
    }

    componentWillReceiveProps(nextProps) {
        let state = this.state;
        if (typeof nextProps.currentLevel !== undefined ) {
            state.accessoryLevel = nextProps.currentLevel
        };
        
    }

    render() {
        let linkCalcs = <ul></ul>
        if (this.props.stats.links) {
            linkCalcs = <ul>
            <li>Health Efficiency: <span className="stat-view">{this.props.stats.links.healthEfficiency}</span></li>
            <li>Damage Mitigation: <span className="stat-view">{this.props.stats.links.damageMitigation}</span></li>
            <li>Damage Bonus:<span className="stat-view">{this.props.stats.links.damageBonus}</span> </li>
            <li>Damage Output: <span className="stat-view">{this.props.stats.links.damageOutput}</span></li>
        </ul> 
        }
        return (<div className="stat-window"  style={this.props.styling}>
            <span className="x-close" onClick={() => {this.props.openClose('Stats')}}>x</span>
            <h3>Modify Accessory Level: </h3>
            <label htmlFor="accessory" className="custom-select">
            <select value={this.state.accessoryLevel} onChange={this.handleChange} name="accessory">
                <option key='0' value='0'>0</option>
                <option key='1' value='1'>1</option>
                <option key='2' value='2'>2</option>
                <option key='3' value='3'>3</option>
                <option key='4' value='4'>4</option>
            </select>
            </label>
            <ul>
                <li>Damage Bonus: <span className="stat-view">{this.props.stats.damage}</span></li>
                <li>Health Bonus: <span className="stat-view">{this.props.stats.health}</span></li>
                <li>Speed Bonus:<span className="stat-view">{this.props.stats.speed}</span> </li>
                <li>Critical Chance: <span className="stat-view">{this.props.stats.critical_chance}</span></li>
                <li>Critical Damage: <span className="stat-view">{this.props.stats.critical_damage}</span></li>
                <li>Evade Chance: <span className="stat-view">{this.props.stats.evade}</span></li>
                <li>Block Chance: <span className="stat-view">{this.props.stats.block}</span></li>
                <li>Life Steal:<span className="stat-view">{this.props.stats.life_steal}</span> </li>
                <li>Damage Enrage:<span className="stat-view">{this.props.stats.damage_enrage}</span> </li>
                <li>Team Enrage:<span className="stat-view">{this.props.stats.team_enrage}</span> </li>
                <li>Deflect Chance:<span className="stat-view">{this.props.stats.deflect_chance}</span> </li>
                <li>Absorb Chance:<span className="stat-view">{this.props.stats.absorb_chance}</span> </li>
                <li>Damage Reduction:<span className="stat-view">{this.props.stats.damage_reduction}</span> </li>
                <li>Dual Strike:<span className="stat-view">{this.props.stats.dual_strike}</span> </li>
                <li>Empower Chance:<span className="stat-view">{this.props.stats.empower_chance}</span> </li>
                <li>Redirect Chance:<span className="stat-view">{this.props.stats.redirect_chance}</span> </li>
                <li>Quad Strike:<span className="stat-view">{this.props.stats.quad_strike}</span> </li>
                <li>Richochet Chance:<span className="stat-view">{this.props.stats.richochet_chance}</span> </li>
                <li>Healing:<span className="stat-view">{this.props.stats.healing}</span> </li>

            </ul>
            <h3>Link Calculated Mitigations: </h3>
            {linkCalcs}
        </div>)
    }
};

StatWindow.propTypes = {
  stats: PropTypes.object.isRequired,
  modifyAccessoryLevel: PropTypes.func.isRequired,
  currentLevel: PropTypes.number.isRequired,
  openClose: PropTypes.func.isRequired
}
