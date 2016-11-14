/**
 * This class is a dump components,display image which is suplpied
 * as a src
 *
 * @name: Profile
 * @description: An single div, which takes image src and display
 */

import React from 'react';

class Profile extends React.Component {

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
    return (
    	<div className="mzr-user-profile" style={{backgroundImage: this.props.src}}>
      </div>
    );
  }
}

Profile.propTypes = {
  src: React.PropTypes.string
};

export default Profile;
