/**
 * This class is a dump components, used for displaying the comments entered
 * by user
 *
 * @name: Comment
 * @description: Component which displays the comments along with user profile
 */

import React from 'react';
import MarkerBadge from 'components/marker-badge.react';
import ProfileImage from 'components/profile-image.react';
import Verdict from 'components/verdict.react';
import Slider from 'components/slider.react';
import classNames from 'classnames';

class Comment extends React.Component {

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
   * A sub function for react render function
   * to be called to render the additional info
   */
  renderAddInfo = () => {
    if (this.props.additionalInfo) {
      let classname = "mzr-add-info";
      classname += " time-zone mzr-" + this.props.tag + '-info';
      return <div className={classname}>{this.props.additionalInfo}</div>;
    }

    return '';
  }

  /**
   * a function to be called on clicking on the comment
   *
   * @param e - event
   */
  onClick = (e) => {
    this.props.onClick(this.props.id, this.props.tag, e);
  }

  /**
   * function callback on verdict selection
   *
   * @param id - number
   * @param e - event
   */
  onVerdictSelect = (id, e) => {
    if (this.props.onVerdictSelect)
      this.props.onVerdictSelect(id);

    e.stopPropagation();
  }

  /**
   * function to render the verdict components
   */
  renderVerdict = () => {
    let verdicts = [];
    for (let i = 2; i >= 0; i--) {
      verdicts.push(<Verdict key={i} id={i} isSelected={this.props.verdict == i} onClick={this.onVerdictSelect.bind(this, i)} selectionClassName={this.props.verdict == i ? 'mzr-' + this.props.tag + '-selected' : ''} />)
    }
    return verdicts;
  }

  render () {
    let classes = {'well mzr-comment-box': true};

    if (this.props.className)
      classes[this.props.className] = true;

    let liClasses = classNames(classes);

    return (
      <div className={liClasses} onClick={this.onClick}>
        {this.renderAddInfo()}
        <div className="clearafter">
  				<div className="col-md-2 col-xs-2 no-p">
            <ProfileImage />
          </div>
          <div className="col-md-2 col-xs-2 no-p">
  					<div className="content">
              <MarkerBadge className={this.props.badgeClassName} key={this.props.id} value={this.props.id} />
            </div>
          </div>
          <div className="col-md-8 col-xs-8 p-left">
            <div className="content">
              {this.props.value}
            </div>
					</div>
        </div>
        <div className="clearafter">
          <div className="col-md-2 col-xs-2 no-p">
            <div className="content">
              <p className="last_p">Rate</p>
            </div>
          </div>
          <div className="col-md-10 col-xs-10">
            <div className="content">
              <Slider id={this.props.tag + this.props.rate} disable={true} tag={this.props.tag} value={this.props.rate}/>
            </div>
        </div>
        </div>
        <div className="clearafter">
          <div className="col-md-8 col-xs-8">
            <div className="content clearafter">
              <div className="col-md-4 col-xs-4 p-left">
                <p className="last_p">Verdict</p>
              </div>
              <div className="col-md-8 col-xs-8 p-left">
                {this.renderVerdict()}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-4">
            <div className="clearafter">
              <div className="pull-right">
                <button className={"btn-reply-"+ this.props.tag}>Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  value: React.PropTypes.string,
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  additionalInfo: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  tag: React.PropTypes.string,
  className: React.PropTypes.string,
  badgeClassName: React.PropTypes.string,
  verdict: React.PropTypes.number,
  onVerdictSelect: React.PropTypes.func,
  onClick: React.PropTypes.func,
  rate: React.PropTypes.number,
  onReply: React.PropTypes.func
};

export default Comment;
