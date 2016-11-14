/**
 * This class is a React view and it acts as smart component,
 * where all the components are renders,
 * connects to the data store and retrieves data
 * rendered through routes
 *
 * @name: Home
 * @description: An view to consolidate the required components
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';

import _ from 'underscore';
import utils from 'utils/helpers';

import * as Actions from 'actions/actions';
import Comment from 'components/comment.react';
import MzrVideo from 'components/mzr-video.react';
import TextContent from 'components/text-content.react';

import CommentBox from 'components/comment-box.react';

import MarkerBadge from 'components/marker-badge.react';


class Home extends React.Component {
  constructor (props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(Actions, dispatch);
    this.state = {
      showCommentBox: false,
      currentCommentId: '',
      currentCommentTag: '',
      currentPosition: {},
      highlight: '',
      highlightfrom: '',
      highlighttag: ''
    }
    this.videoComments = _.where(props.meazr.comments, {tag: props.meazr.tags.video});
    this.textComments = _.where(props.meazr.comments, {tag: props.meazr.tags.text});

    // based on the data, it might goes in to the render function
    this.meta = {
      title: 'meaZr - The Global Talent Measurement Ecosystem',
      description: 'An online self assestment tool',
      canonical: 'https://meazr.com/',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'assestment, video playback, estimate myself'
        }
      }
    }
  }

  /**
   * React's life cycle component
   *
   * @param nextprops - object
   */
  componentWillReceiveProps(nextprops) {
    this.props = nextprops;
    this.videoComments = _.where(this.props.meazr.comments, {tag: this.props.meazr.tags.video});
    this.textComments = _.where(this.props.meazr.comments, {tag: this.props.meazr.tags.text});
  }

  /**
   * function to reset the state
   */
  setInitialState = () => {
    this.setState ({
      showCommentBox: false,
      currentCommentId: '',
      currentCommentTag: '',
      currentPosition: {}
    });
  }

  /**
   * a callback function to be called,
   * supplied to CommentBox component
   *
   * @param comment - string
   */
  onComments = (comment, slidervalue) => {
    this.actions.addComments(this.state.currentCommentId - 1, this.state.currentCommentTag, comment, this.state.currentPosition, slidervalue);
    this.setInitialState();
  }

  /**
   * a callback function to be called,
   * supplied to CommentBox component,
   * called when commentbox is closed
   *
   */
  onCommentCancel = () => {
    this.setInitialState();
  }

  /**
   * a callback function to be called,
   * when user wants to comment,
   * supplied to Video component and text component
   *
   * @param tag - string
   * @param position - string/object
   */
  onWantComment = (tag, position) => {
    let comments = this[tag + 'Comments'];
    let commentId = comments && comments.length > 0 ? comments.length : 0;
    this.setState({
      ...this.state,
      showCommentBox: true,
      currentCommentId: commentId + 1,
      currentCommentTag: tag,
      currentPosition: position
    });
  }

  /**
   * function to set the highlight on badge component
   *
   * @param value - string
   * @param tag - string
   * @param isComments - boolean
   */
  highlightMarkerandTags = (value, tag, isComments) => {
    $('.mzr-'+this.props.meazr.tags.text+'-badge').removeClass('mzr-highlight');
    $('.mzr-'+this.props.meazr.tags.video+'-badge').removeClass('mzr-highlight');
    $('.mzr-'+tag+'-badge').filter("[data-key='" + value + "']").addClass('mzr-highlight');
  }

  /**
   * function to be called on clicking the marker
   *
   * @param value - string
   */
  onMarkerClick = (value) => {
    this.highlightMarkerandTags(value, this.props.meazr.tags.text);
  }

  /**
   * function to be called on clicking the video marker
   *
   * @param value - string
   */
  onVideoMarkerClicked = (value) => {
    this.highlightMarkerandTags(value, this.props.meazr.tags.video);
  }

  /**
   * function to be called on clicking on the comment boxes
   *
   * @param value - string
   * @param tag - string
   * @param event - javascript event
   */
  onCommentsClick = (value, tag, event) => {
    this.highlightMarkerandTags(value, tag, true);
    event.stopPropagation();
  }

  /**
   * A sub function for react render,
   * called to render the badges
   */
  renderBadge = () => {
    let badges = [];
    let comments = this[this.props.meazr.tags.text + 'Comments'];
    if (comments)
      for (let i = 0; i < comments.length; i++) {
        let classNames = "mzr-text-badge";
        badges.push(<MarkerBadge onClick={this.onMarkerClick} className={classNames} key={i} value={i+1} position={comments[i].position} />);
      }
    return badges;
  }

  /**
   * function to be called on selecction of the verdict,
   * in comments
   *
   * @param index - number
   * @param verdictId - number
   */
  onVerdictSelect = (index, verdictId) => {
    let comment = this.props.meazr.comments[index];
    if (comment) {
      comment.verdict = verdictId;
    }
    this.actions.updateComment(index, comment);
  }

  /**
   * A sub function for react render,
   * called to render the comments
   */
  renderComments = () => {
    let comments = [];
    let tagsCount = {};
    for (let i = 0; i < this.props.meazr.comments.length; i++) {
      if (tagsCount[this.props.meazr.comments[i].tag]) {
        tagsCount[this.props.meazr.comments[i].tag]++;
      } else {
        tagsCount[this.props.meazr.comments[i].tag] = 1;
      }
      let addinfo = null;
      if (this.props.meazr.tags.video == this.props.meazr.comments[i].tag)
        addinfo =  utils.convertoHHMMSS(this.props.meazr.comments[i].position);

      let classNames = "mzr-comment-" + this.props.meazr.comments[i].tag;
      let badgeClassName = "mzr-" + this.props.meazr.comments[i].tag + "-badge";

      comments.push(<Comment rate={this.props.meazr.comments[i].rate} verdict={this.props.meazr.comments[i].verdict} onVerdictSelect={this.onVerdictSelect.bind(this, i)} onClick={this.onCommentsClick} badgeClassName={badgeClassName} className={classNames} tag={this.props.meazr.comments[i].tag} key={this.props.meazr.comments[i].tag + i} id={tagsCount[this.props.meazr.comments[i].tag]} value={this.props.meazr.comments[i].text} additionalInfo={addinfo} />);
    }
    return comments;
  }

  /**
   * function called on clicking on anywhere in the page
   *
   * @param e - event
   */
  onClick = (e) => {
    if ($(e.target).closest('.mzr-video').length < 1 && $(e.target).closest('.lastdiv').length < 1)
      this.onWantComment('text', {x: e.clientX, y: e.clientY});
  }

  render () {
    return (
      <div className="holder mzr-home" onClick={this.onClick}>
        <DocumentMeta {...this.meta} />
        {this.renderBadge()}
        <CommentBox tag={this.state.currentCommentTag} show={this.state.showCommentBox} onClose={this.onCommentCancel} onSave={this.onComments} commentId={this.state.currentCommentId}/>
        <div className="container-fluid no-p">
          <div className="clearafter">
            <div className="col-md-5 col-sm-6 custm_div">
              <div className="main-holder">
                <div className="leftcontent">
                  <TextContent text={this.props.meazr.text} onWantComment={this.onWantComment.bind(this, 'text')} />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 custm_div">
              <div className="main-holder">
                <MzrVideo onMarkerClick={this.onVideoMarkerClicked} badgeClassName={"mzr-" + "video" + "-badge"} comments={this[this.props.meazr.tags.video + 'Comments']} src={this.props.meazr.videosrc} onWantComment={this.onWantComment.bind(this, 'video')} />
              </div>
            </div>
            <div className="col-md-3 no-p no-padsmall col-sm-6 custm_div">
              <div className="lastdiv main-holder">
                {this.renderComments()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { meazr } = state;
  return {
    meazr
  };
}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  meazr: React.PropTypes.object
};

export default connect(mapStateToProps)(Home);
