import React from 'react';
import PropTypes from "prop-types";

import { sets } from '../sets';

const BonusView = (props) => {
    var hasMythics, hasSets;
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

    return (<div>
      Current Bonuses: 
      {hasMythics}
      {hasSets}
    </div>)
};

BonusView.propTypes = {
  bonuses: PropTypes.object.isRequired
}

export default BonusView