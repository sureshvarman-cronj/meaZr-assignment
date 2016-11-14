/**
 * This class is a dump components, used for slider rating
 *
 * @name: Slider
 * @description: An jquery slider class
 */

import React from 'react';
import classNames from 'classnames';

class Slider extends React.Component {

  constructor (props) {
    super(props);
  }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
   componentDidMount() {
     let that = this;
     this.slider = $('#' + this.props.id).limitslider({
			label: true,
			min: 1,
			max: 10,
      change: that.onSliderChange.bind(that),
			ranges:		[false, { styleClass: 'range-glow' }, false, true]
	   });
     this.updateSlider();
   }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
  componentWillReceiveProps(nextprops) {
    this.props = nextprops;
    this.updateSlider();
  }

  /**
   * function to update slider using
   * latest props
   */
   updateSlider = () => {
     if (this.props.value > -1)
      this.slider.limitslider('values', [this.props.value]);
     if (this.props.disable) {
       this.slider.limitslider('disable');
     }
     else {
       this.slider.limitslider('enable');
     }
   }

  /**
   * function to be called on the slider is been changed
   *
   * @param e - event
   */
  onSliderChange = (e) => {
    if (this.props.onSliderChange)
      this.props.onSliderChange(this.slider.limitslider('values'));

    e.stopPropagation();
  }

  render () {
    let classes = {'mzr-slider': true};

    if (this.props.tag)
      classes[this.props.tag] = true;

    let liClasses = classNames(classes);

    return (
      <div className="rating-slider">
        <div id={this.props.id} className={liClasses}></div>
      </div>
    );
  }
}

Slider.propTypes = {
  tag: React.PropTypes.string,
  onSliderChange: React.PropTypes.func,
  disable: React.PropTypes.bool,
  value: React.PropTypes.number,
  id: React.PropTypes.string
};

export default Slider;
