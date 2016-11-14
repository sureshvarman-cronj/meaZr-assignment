/**
 * This class is a dump components,display verdict icon
 *
 * @name: Verdict
 * @description: An single div, with icons
 */

import React from 'react';
import classNames from 'classnames';

class Verdict extends React.Component {

  constructor (props) {
    super(props);
  }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
  componentWillReceiveProps(nextprops) {
    this.props = nextprops;
  }

  render () {
    let classes = {'fa fa-thumbs-o-up': true};

    if (this.props.className)
      classes[this.props.className] = true;

    if (this.props.id == 1)
      classes['fa-rotate-270'] = true;
    else if (this.props.id == 0)
      classes['fa-rotate-180'] = true;

    if (this.props.isSelected)
      classes[this.props.selectionClassName] = true;

    let liClasses = classNames(classes);

    return (
      <span onClick={this.props.onClick} className={"icon-holder"}><i className={liClasses}></i></span>
    );
  }
}

Verdict.propTypes = {
  id: React.PropTypes.number,
  isSelected: React.PropTypes.bool,
  selectionClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Verdict;
