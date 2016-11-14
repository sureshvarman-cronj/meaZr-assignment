/**
 * This class is a dump components, display video from the supplied src
 * and option to place the marker from the props
 *
 * @name: MzrVideo
 * @description: An HTML5 video player, option to place marker and display
 */

import React from 'react';
import ReactDOM  from 'react-dom';
import VideoMarker from 'components/video-marker.react';

class MzrVideo extends React.Component {

  constructor (props) {
    super(props);
    this.video = {};
    this.state = {
      lastTime: null
    };
  }

  /**
   * React's life cycle component
   * called when the component is initialized
   */
  componentDidMount() {
    this.video = videojs(this.refs.video);
    $('.vjs-progress-holder').append('<div id="mzr-video-holder"></div>');
    let that = this;
    this.video.on('seeked', function(e) {
      let newtime = that.video.currentTime().toFixed(0);
      if (that.state.lastTime != newtime) {
        that.onWantComment(newtime);
        that.setState({...this.state, lastTime: newtime});
      }
    })
  }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
  componentWillReceiveProps(nextprops) {
    this.props = nextprops;
    this.setMarkers(this.props.comments);
  }

  /**
   * function to be called when the marker is clicked
   *
   * @param value - string
   */
  onMarkerClick = (value) => {
    this.props.onMarkerClick(value);
  }

  /**
   * function to be called, when the clicked on the timeline
   *
   * @param timeline - number
   */
  onWantComment = (timeline) => {
    this.video.pause();
    this.props.onWantComment(timeline);
  }

  /**
   * function to get the current position
   *
   * @param marker - number
   *
   * @return number
   */
  getmarkerPosition = (marker) => {
    return marker / this.video.duration() * 100;
  }

  /**
   * function to set the marker anywhere in the timline
   *
   * @param markers - array(number)
   */
  formMarkers = (markers) => {
    let markerDOMs = [];
    for (let i = 0; i < markers.length; i++) {
      let style = {
        left: this.getmarkerPosition(markers[i].position) + '%',
        width: '3px',
        height: '10px'
      }
      markerDOMs.push(<VideoMarker onClick={this.onMarkerClick} badgeClassName={this.props.badgeClassName} key={markers[i].position + '' + i} style={style} value={i + 1}/>);
    }
    return <span>{markerDOMs}</span>;
  }

  /**
   * function to be called, when new markers arrives
   *
   * @param comments - string
   */
  setMarkers = (comments) => {
    ReactDOM.render(this.formMarkers(comments), $('#mzr-video-holder')[0]);
  }

  render () {
    return (
    	<div className="mzr-video">
        <video id="demo_video" data-setup="{fluid: true}" ref="video" className="video-js vjs-default-skin" controls preload="auto">
          <source src={this.props.src} type='video/mp4' />
        </video>
      </div>
    );
  }
}

MzrVideo.propTypes = {
  src: React.PropTypes.string,
  onWantComment: React.PropTypes.func.isRequired,
  comments: React.PropTypes.arrayOf(React.PropTypes.object),
  className: React.PropTypes.string,
  badgeClassName: React.PropTypes.string
};

export default MzrVideo;
