/**
 * This class is a smart components, used to display company info and userinfo
 *
 * @name: Header
 * @description: Navbar
 */

import React from 'react';

export default class Header extends React.Component {
  constructor () {
    super();
  }
  render () {
    return (
      <header className="mzr-header">
        <div className="container-fluid">
          <div className="clearfix">
            <div className="col-md-12">
              <h3 className="white_text">meaZr</h3>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
