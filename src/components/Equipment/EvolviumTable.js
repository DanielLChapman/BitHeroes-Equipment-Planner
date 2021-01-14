import React, { Component } from 'react';
import PropTypes from "prop-types";


class EvolviumTable extends Component {



    render() {
        let bonuses = {
            a: "+5% Damage",
            b: "+5% Speed",
            c: "+20% Purification",
            d: "+10% SP Regen",
            e: "+5 Dual Strike",
            f: "+5% Empower Chance",
            g: "Adrenaline 3%",
            h: "Revitalize 10%"
        }
        if (this.props.name === 'Evolvium Defense') {
            bonuses = {
                a: "+5% DR",
                b: "+10% Block",
                c: "+5% Evade",
                d: "+2.5% Absorb",
                e: "+10% Vamp",
                f: "Shield is 90% HP",
                g: "Extort",
                h: "Barrier"
            }
        }

        return (
            <div>
                <span>{this.props.name}</span>
                <table className="evolvium-table">
                    <thead>
                        <tr>
                            <th>Bonus 1</th>
                            <th>Bonus 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td 
                                className={this.props.evolviumTable['aorb'] === 'a' ? 'selected' : ''} 
                                name="a"
                                onClick={
                                    () => {
                                        this.props.setFunction('a')
                                    }
                                }
                                > {bonuses['a']}</td>
                            <td 
                                className={this.props.evolviumTable['aorb'] === 'b' ? 'selected' : ''} 
                                name="b"
                                onClick={
                                    () => {
                                        this.props.setFunction('b')
                                    }
                                }>{bonuses['b']}</td>
                        </tr>
                        <tr>
                        <td 
                                className={this.props.evolviumTable['cord'] === 'c' ? 'selected' : ''} 
                                name="c"
                                onClick={
                                    () => {
                                        this.props.setFunction('c')
                                    }
                                }
                                > {bonuses['c']}</td>
                            <td 
                                className={this.props.evolviumTable['cord'] === 'd' ? 'selected' : ''} 
                                name="d"
                                onClick={
                                    () => {
                                        this.props.setFunction('d')
                                    }
                                }>{bonuses['d']}</td>
                        </tr>
                        <tr>
                        <td 
                                className={this.props.evolviumTable['eorf'] === 'e' ? 'selected' : ''} 
                                name="e"
                                onClick={
                                    () => {
                                        this.props.setFunction('e')
                                    }
                                }
                                > {bonuses['e']}</td>
                            <td 
                                className={this.props.evolviumTable['eorf'] === 'f' ? 'selected' : ''} 
                                name="f"
                                onClick={
                                    () => {
                                        this.props.setFunction('f')
                                    }
                                }>{bonuses['f']}</td>
                        </tr>
                        <tr>
                        <td 
                                className={this.props.evolviumTable['gorh'] === 'g' ? 'selected' : ''} 
                                name="g"
                                onClick={
                                    () => {
                                        this.props.setFunction('g')
                                    }
                                }
                                > {bonuses['g']}</td>
                            <td 
                                className={this.props.evolviumTable['gorh'] === 'h' ? 'selected' : ''} 
                                name="h"
                                onClick={
                                    () => {
                                        this.props.setFunction('h')
                                    }
                                }>{bonuses['h']}</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        );
    }
}

EvolviumTable.propTypes = {
    name: PropTypes.string.isRequired,
    setFunction: PropTypes.func.isRequired,
    evolviumTable: PropTypes.object.isRequired,
}



export default EvolviumTable;