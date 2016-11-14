/**
 * This class is a dump components, an special div to mark inside videos
 *
 * @name: VideoMarker
 * @description: An div also called as marker used inside the videos
 */

import React from 'react';
import MarkerBadge from 'components/marker-badge.react';

class VideoMarker extends React.Component {
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

  render() {
    return (
      <div style={this.props.style} className="mzr-video-marker">
        <MarkerBadge onClick={this.props.onClick} className={this.props.badgeClassName} value={this.props.value} />
        <div className="mzr-timeline"></div>
      </div>
    )
  }
}


VideoMarker.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  style: React.PropTypes.object,
  badgeClassName: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

export default VideoMarker;
