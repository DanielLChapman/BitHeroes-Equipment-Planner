import React from 'react';
import PropTypes from "prop-types";

import {statTable, elementsIndentifier} from '../stats'

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
            linkCalcs = (
                <>
                    <h4>Sorted By Elementals</h4>
                    <h4>Attacking With Specific Element</h4>
                    <h4>Defending Against Elemental Type</h4>
                {
                    elementsIndentifier.map((x, i) => {
                        return (
                            <React.Fragment key={i}>
                                <ul className="link-stat-table-ul">
                                    {x.name} :
                                </ul>
                                <table className="stat-window-table links-stat-table">
                                    <thead>
                                        <tr>
                                            <th>Value</th>
                                            <th>Min</th>
                                            <th>Avg</th>
                                            <th>Max</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{color: `${x.color}`}}>
                                                <tr>
                                                    <td>Damage Bonus</td>
                                                    <td>{this.props.min_stats.links[`${x.lowercase}DamageBonus`]}</td>
                                                    <td>{this.props.stats.links[`${x.lowercase}DamageBonus`]}</td>
                                                    <td>{this.props.max_stats.links[`${x.lowercase}DamageBonus`]}</td>
                                                </tr>

                                                <tr>
                                                    <td>Damage Output</td>
                                                    <td>{this.props.min_stats.links[`${x.lowercase}DamageOutput`]}</td>
                                                    <td>{this.props.stats.links[`${x.lowercase}DamageOutput`]}</td>
                                                    <td>{this.props.max_stats.links[`${x.lowercase}DamageOutput`]}</td>
                                                </tr>

                                                <tr>
                                                    <td>Health Efficiency</td>
                                                    <td>{this.props.min_stats.links[`${x.lowercase}HealthEfficiency`]}</td>
                                                    <td>{this.props.stats.links[`${x.lowercase}HealthEfficiency`]}</td>
                                                    <td>{this.props.max_stats.links[`${x.lowercase}HealthEfficiency`]}</td>
                                                </tr>

                                                <tr>
                                                    <td>Total DR</td>
                                                    <td>{this.props.min_stats.links[`total${x.name}DamageReduction`]}</td>
                                                    <td>{this.props.stats.links[`total${x.name}DamageReduction`]}</td>
                                                    <td>{this.props.max_stats.links[`total${x.name}DamageReduction`]}</td>
                                                </tr>

                                                <tr>
                                                    <td>Damage Mitigation</td>
                                                    <td>{this.props.min_stats.links[`${x.lowercase}DamageMitigation`]}</td>
                                                    <td>{this.props.stats.links[`${x.lowercase}DamageMitigation`]}</td>
                                                    <td>{this.props.max_stats.links[`${x.lowercase}DamageMitigation`]}</td>
                                                </tr>
             
                                    </tbody>
                                </table>
                            </React.Fragment>
                        )
                    })
                }
                
                </>
            )
            

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

            <table className="stat-window-table">
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Min</th>
                        <th>Avg</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    {statTable.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>{x.name}</td>
                                <td>{this.props.min_stats[x.id]}</td>
                                <td>{this.props.stats[x.id]}</td>
                                <td>{this.props.max_stats[x.id]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

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
