import React from 'react';
import PropTypes from "prop-types";


const EquippedView = (props) => {
    if('name' in props.equipped) {
      return (
        <React.Fragment>

          <div className={`equipped-image-view equipped-image-view-${props.equipped.slot}`}>
            <img src={`/images/${props.equipped.image}`} alt={`${props.equipped.name}-equipment`} />
          </div>

          <div className={`equipped-name-view equipped-name-view-${props.equipped.slot}`}>
            <span className="equipped-item-name">{props.equipped.name}</span>
          </div>
          <span className="slot-name"></span>
        </React.Fragment>
      )
    } else {
      return (
        <div className="nothing-to-see-here">
          <h1>?</h1>
          <span className="slot-name"></span>
        </div>
      )
    }
}


EquippedView.propTypes = {
  equipped: PropTypes.object.isRequired
}

export default EquippedView;