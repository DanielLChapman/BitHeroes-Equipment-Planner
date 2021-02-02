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

    updateInputValue = (event) => {
        let typeOfS = event.currentTarget.getAttribute('stat');
        this.props.updateStats(event.currentTarget.value, typeOfS);
    }

    static getDerivedStateFromProps(props, state) {
        if (typeof props.currentLevel !== undefined ) {
            return {accessoryLevel: props.currentLevel}
        };
    }
    
    render() {
        let linkCalcs = <ul></ul>
        if (this.props.stats.links) {
            linkCalcs = <ul>
            <li>Sorted By Elementals</li>
            <li>Attacking With Specific Element</li>
            <li>Defending Against Elemental Type</li>
            <li>Physical:</li>
            <li>Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.physicalDamageBonus} - {this.props.stats.links.physicalDamageBonus} - {this.props.max_stats.links.physicalDamageBonus}</span> </li>
            <li>Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.physicalDamageOutput } - {this.props.stats.links.physicalDamageOutput} - {this.props.max_stats.links.physicalDamageOutput}</span></li>
            <li>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.physicalHealthEfficiency } - {this.props.stats.links.physicalHealthEfficiency} - {this.props.max_stats.links.physicalHealthEfficiency}</span></li>
            <li>Total Physical DR: <span className="stat-view ">{this.props.min_stats.links.totalPhysicalDamageReduction } - {this.props.stats.links.totalPhysicalDamageReduction} - {this.props.max_stats.links.totalPhysicalDamageReduction}</span></li>
            <li>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.physicalDamageMitigation } - {this.props.stats.links.physicalDamageMitigation} - {this.props.max_stats.links.physicalDamageMitigation}</span></li>

            <li>Electric: </li>
            <li style={{color: 'lightblue'}}>Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.electricDamageBonus } - {this.props.stats.links.electricDamageBonus} - {this.props.max_stats.links.electricDamageBonus}</span> </li>
            <li style={{color: 'lightblue'}}>Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.electricDamageOutput} - {this.props.stats.links.electricDamageOutput} - {this.props.max_stats.links.electricDamageOutput}</span></li>
            <li style={{color: 'lightblue'}}>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.electricHealthEfficiency } - {this.props.stats.links.electricHealthEfficiency} - {this.props.max_stats.links.electricHealthEfficiency}</span></li>
            <li style={{color: 'lightblue'}}>Total Electric DR: <span className="stat-view ">{this.props.min_stats.links.totalElectricDamageReduction } - {this.props.stats.links.totalElectricDamageReduction} - {this.props.max_stats.links.totalElectricDamageReduction}</span></li>
            <li style={{color: 'lightblue'}}>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.electricDamageMitigation } - {this.props.stats.links.electricDamageMitigation} - {this.props.max_stats.links.electricDamageMitigation}</span></li>
            <li>Water: </li>
            <li style={{color: 'aquamarine'}}>Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.waterDamageBonus} - {this.props.stats.links.waterDamageBonus} - {this.props.max_stats.links.waterDamageBonus}</span> </li>
            <li style={{color: 'aquamarine'}}>Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.waterDamageOutput } - {this.props.stats.links.waterDamageOutput} - {this.props.max_stats.links.waterDamageOutput}</span></li>
            <li style={{color: 'aquamarine'}}>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.waterHealthEfficiency } - {this.props.stats.links.waterHealthEfficiency} - {this.props.max_stats.links.waterHealthEfficiency}</span></li>
            <li style={{color: 'aquamarine'}}>Total Water DR: <span className="stat-view ">{this.props.min_stats.links.totalWaterDamageReduction } - {this.props.stats.links.totalWaterDamageReduction} - {this.props.max_stats.links.totalWaterDamageReduction}</span></li>
            <li style={{color: 'aquamarine'}}>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.waterDamageMitigation } - {this.props.stats.links.waterDamageMitigation} - {this.props.max_stats.links.waterDamageMitigation}</span></li>
            <li>Fire: </li>
            <li style={{color: 'firebrick'}}>Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.fireDamageBonus } - {this.props.stats.links.fireDamageBonus} - {this.props.max_stats.links.fireDamageBonus}</span> </li>
            <li style={{color: 'firebrick'}}>Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.fireDamageOutput } - {this.props.stats.links.fireDamageOutput} - {this.props.max_stats.links.fireDamageOutput}</span></li>
            <li style={{color: 'firebrick'}}>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.fireHealthEfficiency } - {this.props.stats.links.fireHealthEfficiency} - {this.props.max_stats.links.fireHealthEfficiency}</span></li>
            <li style={{color: 'firebrick'}}>Total Fire DR: <span className="stat-view ">{this.props.min_stats.links.totalFireDamageReduction } - {this.props.stats.links.totalFireDamageReduction} - {this.props.max_stats.links.totalFireDamageReduction}</span></li>
            <li style={{color: 'firebrick'}}>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.fireDamageMitigation } - {this.props.stats.links.fireDamageMitigation} - {this.props.max_stats.links.fireDamageMitigation}</span></li>
            <li>Earth:</li>
            <li style={{color: 'darkseagreen'}}>Earth Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.earthDamageBonus } - {this.props.stats.links.earthDamageBonus} - {this.props.max_stats.links.earthDamageBonus}</span> </li>
            <li style={{color: 'darkseagreen'}}>Earth Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.earthDamageOutput } - {this.props.stats.links.earthDamageOutput} - {this.props.max_stats.links.earthDamageOutput}</span></li>
            <li style={{color: 'darkseagreen'}}>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.earthHealthEfficiency } - {this.props.stats.links.earthHealthEfficiency} - {this.props.max_stats.links.earthHealthEfficiency}</span></li>
            <li style={{color: 'darkseagreen'}}>Total Earth DR: <span className="stat-view ">{this.props.min_stats.links.totalEarthDamageReduction } - {this.props.stats.links.totalEarthDamageReduction} - {this.props.max_stats.links.totalEarthDamageReduction}</span></li>
            <li style={{color: 'darkseagreen'}}>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.earthDamageMitigation } - {this.props.stats.links.earthDamageMitigation} - {this.props.max_stats.links.earthDamageMitigation}</span></li>
            <li>Air</li>
            <li style={{color: 'mintcream'}}>Air Damage Bonus:<span className="stat-view ">{this.props.min_stats.links.airDamageBonus } - {this.props.stats.links.airDamageBonus} - {this.props.max_stats.links.airDamageBonus}</span> </li>
            <li style={{color: 'mintcream'}}>Air Damage Output: <span className="stat-view damage-output ">{this.props.min_stats.links.airDamageOutput } - {this.props.stats.links.airDamageOutput} - {this.props.max_stats.links.airDamageOutput}</span></li>
            <li style={{color: 'mintcream'}}>Health Efficiency: <span className="stat-view ">{this.props.min_stats.links.airHealthEfficiency } - {this.props.stats.links.airHealthEfficiency} - {this.props.max_stats.links.airHealthEfficiency}</span></li>
            <li style={{color: 'mintcream'}}>Total Air DR: <span className="stat-view ">{this.props.min_stats.links.totalAirDamageReduction } - {this.props.stats.links.totalAirDamageReduction} - {this.props.max_stats.links.totalAirDamageReduction}</span></li>
            <li style={{color: 'mintcream'}}>Damage Mitigation: <span className="stat-view ">{this.props.min_stats.links.airDamageMitigation } - {this.props.stats.links.airDamageMitigation} - {this.props.max_stats.links.airDamageMitigation}</span></li>
            
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
            
            <div className="switch"> 
            
            <div className="onoffswitch">
             T12 Ancients : <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" onChange={() => {this.props.openClose('t12DD')}} checked={this.props.t12}/>
                <label className="onoffswitch-label" htmlFor="myonoffswitch"></label>
            </div>
            </div>

            <ul>
                <li>Values:<span className="stat-view">Min - Avg - Max</span></li>
                <li>Damage Bonus: <span className="stat-view">{this.props.min_stats.damage} - {this.props.stats.damage} - {this.props.max_stats.damage}</span></li>
                <li>SP Damage Bonus: <span className="stat-view ">{this.props.min_stats.sp_damage } - {this.props.stats.sp_damage} - {this.props.max_stats.sp_damage}</span></li>
                <li>Health Bonus: <span className="stat-view ">{this.props.min_stats.health } - {this.props.stats.health} - {this.props.max_stats.health}</span></li>
                <li>Speed Bonus:<span className="stat-view ">{this.props.min_stats.speed } - {this.props.stats.speed} - {this.props.max_stats.speed}</span> </li>
                <li>Critical Chance: <span className="stat-view ">{this.props.min_stats.critical_chance } - {this.props.stats.critical_chance} - {this.props.max_stats.critical_chance}</span></li>
                <li>Critical Damage: <span className="stat-view ">{this.props.min_stats.critical_damage } - {this.props.stats.critical_damage} - {this.props.max_stats.critical_damage}</span></li>
                <li>Evade Chance: <span className="stat-view ">{this.props.min_stats.evade } - {this.props.stats.evade} - {this.props.max_stats.evade}</span></li>
                <li>Block Chance: <span className="stat-view ">{this.props.min_stats.block } - {this.props.stats.block} - {this.props.max_stats.block}</span></li>
                <li>Life Steal:<span className="stat-view ">{this.props.min_stats.life_steal } - {this.props.stats.life_steal} - {this.props.max_stats.life_steal}</span> </li>
                <li>Damage Enrage:<span className="stat-view ">{this.props.min_stats.damage_enrage } - {this.props.stats.damage_enrage} - {this.props.max_stats.damage_enrage}</span> </li>
                <li>Team Enrage:<span className="stat-view ">{this.props.min_stats.team_enrage } - {this.props.stats.team_enrage} - {this.props.max_stats.team_enrage}</span> </li>
                <li>Deflect Chance:<span className="stat-view ">{this.props.min_stats.deflect_chance } - {this.props.stats.deflect_chance} - {this.props.max_stats.deflect_chance}</span> </li>
                <li>Absorb Chance:<span className="stat-view ">{this.props.min_stats.absorb_chance } - {this.props.stats.absorb_chance} - {this.props.max_stats.absorb_chance}</span> </li>
                <li>Damage Reduction:<span className="stat-view ">{this.props.min_stats.damage_reduction } - {this.props.stats.damage_reduction} - {this.props.max_stats.damage_reduction}</span> </li>
                <li>Dual Strike:<span className="stat-view ">{this.props.min_stats.dual_strike } - {this.props.stats.dual_strike} - {this.props.max_stats.dual_strike}</span> </li>
                <li>Empower Chance:<span className="stat-view ">{this.props.min_stats.empower_chance } - {this.props.stats.empower_chance} - {this.props.max_stats.empower_chance}</span> </li>
                <li>Redirect Chance:<span className="stat-view ">{this.props.min_stats.redirect_chance } - {this.props.stats.redirect_chance} - {this.props.max_stats.redirect_chance}</span> </li>
                <li>Quad Strike:<span className="stat-view ">{this.props.min_stats.quad_strike } - {this.props.stats.quad_strike} - {this.props.max_stats.quad_strike}</span> </li>
                <li>Richochet Chance:<span className="stat-view ">{this.props.min_stats.richochet_chance } - {this.props.stats.richochet_chance} - {this.props.max_stats.richochet_chance}</span> </li>
                <li>Healing:<span className="stat-view ">{this.props.min_stats.healing } - {this.props.stats.healing} - {this.props.max_stats.healing}</span> </li>
                <li>Fire Damage:<span className="stat-view  ">{this.props.min_stats.fire_damage } - {this.props.stats.fire_damage} - {this.props.max_stats.fire_damage}</span> </li>
                <li>Fire Resistance:<span className="stat-view ">{this.props.min_stats.fire_resistance } - {this.props.stats.fire_resistance} - {this.props.max_stats.fire_resistance}</span> </li>
                <li>Electric Damage:<span className="stat-view  ">{this.props.min_stats.electric_damage } - {this.props.stats.electric_damage} - {this.props.max_stats.electric_damage}</span> </li>
                <li>Electric Resistance:<span className="stat-view ">{this.props.min_stats.electric_resistance } - {this.props.stats.electric_resistance} - {this.props.max_stats.electric_resistance}</span> </li>
                <li>Water Damage:<span className="stat-view ">{this.props.min_stats.water_damage } - {this.props.stats.water_damage} - {this.props.max_stats.water_damage}</span> </li>
                <li>Water Resistance:<span className="stat-view ">{this.props.min_stats.water_resistance } - {this.props.stats.water_resistance} - {this.props.max_stats.water_resistance}</span> </li>
                <li>Air Damage:<span className="stat-view  ">{this.props.min_stats.air_damage } - {this.props.stats.air_damage} - {this.props.max_stats.air_damage}</span> </li>
                <li>Air Resistance:<span className="stat-view ">{this.props.min_stats.air_resistance } - {this.props.stats.air_resistance} - {this.props.max_stats.air_resistance}</span> </li>
                <li>Earth Damage:<span className="stat-view  ">{this.props.min_stats.earth_damage } - {this.props.stats.earth_damage} - {this.props.max_stats.earth_damage}</span> </li>
                <li>Earth Resistance:<span className="stat-view ">{this.props.min_stats.earth_resistance } - {this.props.stats.earth_resistance} - {this.props.max_stats.earth_resistance}</span> </li>
            </ul>
            <h3>Link Calculated Mitigations: </h3>
            <input className="stat-input" value={parseInt(this.props.stats.power, 10) || 0} stat="power" onChange={this.updateInputValue}/>
           
            <input className="stat-input" value={parseInt(this.props.stats.stamina, 10) || 0} stat="stamina" onChange={this.updateInputValue}/>
           
            <input className="stat-input" value={parseInt(this.props.stats.agility, 10) || 0} stat="agility" onChange={this.updateInputValue}/>
           
            {linkCalcs}
        </div>)
    }
};

StatWindow.propTypes = {
  stats: PropTypes.object.isRequired,
  min_stats: PropTypes.object.isRequired,
  max_stats: PropTypes.object.isRequired,
  modifyAccessoryLevel: PropTypes.func.isRequired,
  currentLevel: PropTypes.number.isRequired,
  openClose: PropTypes.func.isRequired
}
