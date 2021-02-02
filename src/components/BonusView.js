import React from 'react';
import PropTypes from "prop-types";

import EvolviumTable from './Equipment/EvolviumTable';
import { sets } from '../sets';

const BonusView = (props) => {
    var hasMythics, hasSets, hasPets, hasAncients, hasMount, evolvium = false, evolType;
    if (props.bonuses.ancients && Object.keys(props.bonuses.ancients).length > 0) {
      hasAncients = <div className="bonus-ancients">
                    <span>Ancient Bonuses: </span>
                    <ul>
                    {
                      Object.keys(props.bonuses.ancients).map((x) => {
                        if (props.bonuses.ancients[x].name === 'Evolvium Offense' || props.bonuses.ancients[x].name === 'Evolvium Defense') {
                          evolvium = true;
                          evolType = props.bonuses.ancients[x].name ;
                        }
                        return <li key={x}><span className="bonus-ancients-name">{props.bonuses.ancients[x].name}</span> : {props.bonuses.ancients[x].effect}</li>
                      })
                    }
                    </ul>
                  </div>
    }
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
                                <span className={`bonus-pet-name bonus-pet-name-${props.bonuses.pets[x].type}`}>{props.bonuses.pets[x].name}</span>:<br /> {props.bonuses.pets[x].effect}<br />
                              </li>
                      })
                    }
                  </ul>
                </div>
    }
    if (props.bonuses.mounts && Object.keys(props.bonuses.mounts).length > 0) {
      if (props.bonuses.mounts.hasOwnProperty('min')) {
        hasMount = <div className="bonus-mounts">
          <span>Mount Bonus:</span>
          <ul>
            <li>
              <span className="bonus-pet-name bonus-pet-name-legendary">{props.bonuses.mounts.title}</span>: <br />
              {props.bonuses.mounts.title}
            </li>
          </ul>
        </div>
      } else {
        hasMount = <div className="bonus-mounts">
          <span>Mount Bonus:</span>
          <ul>
            <li>
              <span className="bonus-pet-name bonus-pet-name-legendary">{props.bonuses.mounts.title}</span>: <br />
              {props.bonuses.mounts.title} + {props.bonuses.mounts.value}
            </li>
          </ul>
        </div>
      }
      
    }

    return (<div className="current-bonuses">
      Current Bonuses: 
      {hasAncients}
      {hasMythics}
      {hasSets}
      {hasPets}
      {hasMount}

      {evolvium && (
        <EvolviumTable name={evolType} setFunction={props.evolviumSelect} evolviumTable={props.evolviumTable} />
      )}
    </div>)
};

BonusView.propTypes = {
  bonuses: PropTypes.object.isRequired
}

export default BonusView
