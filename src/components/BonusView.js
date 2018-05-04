import React from 'react';
import PropTypes from "prop-types";

import { sets } from '../sets';

const BonusView = (props) => {
    var hasMythics, hasSets, hasPets;
    if (props.bonuses.mythics && Object.keys(props.bonuses.mythics).length > 0) {
      hasMythics = <div className="bonus-mythics">
                    <span>Mythic Bonuses: </span>
                    <ul>
                    {
                      Object.keys(props.bonuses.mythics).map((x) => {
                        return <li key={x}><span className="bonus-mythic-name">{props.bonuses.mythics[x].name}</span> : {props.bonuses.mythics[x].effect}</li>
                      })
                    }
                    </ul>
                  </div>
    }
    if (props.bonuses.sets && Object.keys(props.bonuses.sets).length > 0) {
      hasSets = <div className="bonus-sets">
                  <span>Set Bonuses:</span>
                  <ul>
                    {
                      Object.keys(props.bonuses.sets).map((x) => {
                        return <li key={x}>
                                <span className="bonus-set-name">{sets[x].name}</span>
                                <ul>
                                {
                                  props.bonuses.sets[x].map((y) => {
                                    return <li key={y}>{y}</li>
                                  })
                                }
                                </ul>
                              </li>
                      })
                    }
                  </ul>
                </div>
    }
    if (props.bonuses.pets && Object.keys(props.bonuses.pets).length > 0) {
      hasPets = <div className="bonus-pets">
                  <span>Pet/Accessory Bonuses:</span>
                  <ul>
                    {
                      Object.keys(props.bonuses.pets).map((x) => {
                        return <li key={x}>
                                <span className="bonus-pet-name">{props.bonuses.pets[x].name}</span>:<br /> {props.bonuses.pets[x].effect}<br />
                              </li>
                      })
                    }
                  </ul>
                </div>
    }

    return (<div>
      Current Bonuses: 
      {hasMythics}
      {hasSets}
      {hasPets}
    </div>)
};

BonusView.propTypes = {
  bonuses: PropTypes.object.isRequired
}

export default BonusView