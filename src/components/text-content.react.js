/**
 * This class is a dump components,displays suppied text as props
 *
 * @name: TextContent
 * @description: An div displays the text content
 */

import React from 'react';

class TextContent extends React.Component {
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

  /**
   * function to be called, when clicked anywhere on the component
   * @param e - event
   */
  onClick = (e) => {
    this.props.onWantComment({x: e.clientX, y: e.clientY});
  }

  render () {
    return (
    	<div>
        <p className="cursor" onClick={this.onClick}>
          {this.props.text}
        </p>
      </div>
    );
  }
}

TextContent.propTypes = {
  text: React.PropTypes.string,
  onWantComment: React.PropTypes.func.isRequired
};

export default TextContent;
