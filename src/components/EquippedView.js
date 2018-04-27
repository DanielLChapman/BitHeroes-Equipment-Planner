import React, {Component} from 'react';
import PropTypes from "prop-types";


const EquippedView = (props) => {
    if('name' in props.equipped) {
      return (
        <React.Fragment>

          <div className={`equipped-image-view equipped-image-view-${props.equipped.slot}`}>
            <img src={`./images/${props.equipped.image}`} />
          </div>

          <div className={`equipped-name-view equipped-name-view-${props.equipped.slot}`}>
            <span>{props.equipped.name}</span>
          </div>

        </React.Fragment>
      )
    } else {
      return (
        <div className="nothing-to-see-here">
        </div>
      )
    }
}


EquippedView.propTypes = {
  equipped: PropTypes.object.isRequired
}

export default EquippedView;