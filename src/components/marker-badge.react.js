/**
 * This class is a dump components, display the div with given value
 * on its own formatted way
 *
 * @name: MarkerBadge
 * @description: An div which displays the given props
 */

import React from 'react';
import classNames from 'classnames';

class MarkerBadge extends React.Component {

  constructor (props) {
    super(props);
  }

  /**
   * React's life cycle component
   * called when the component is initialized
   */
  componentDidMount = () => {
    if (this.refs.badgeMarker) {
      this.refs.badgeMarker.onclick = this.onClick;
    }
  }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
  componentWillReceiveProps(nextprops) {
    this.props = nextprops;
  }

  /**
   * function to be called on when clicked the marker badge
   *
   * @param e - event
   */
  onClick = (e) => {
    if (this.props.onClick)
      this.props.onClick(e.target.innerHTML, e);
    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    let classes = {'badge': true};

    if (this.props.className)
      classes[this.props.className] = true;

    let liClasses = classNames(classes);

    let style = {};
    if (this.props.position)
      style = {
        left: this.props.position.x + "px",
        top: this.props.position.y + "px",
        position: "absolute"
      }
    return (
    	<div ref="badgeMarker" data-key={this.props.value} className={liClasses} style={style}>
        {this.props.value}
      </div>
    );
  }
}

MarkerBadge.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  position: React.PropTypes.object,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default MarkerBadge
