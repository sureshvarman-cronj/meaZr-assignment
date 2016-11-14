/**
 * This class is a layout, which holds all the child components
 * used to make desicion of routing, mostly auth desicion
 *
 * @name: CoreLayout
 * @description: And simple div containers
 */

import React from 'react';
import Header from 'containers/header';
import Footer from 'containers/footer';

class CoreLayout extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='wrapper'>
          <Header />
          {this.props.children}
          <Footer />
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element
};

export default CoreLayout;
