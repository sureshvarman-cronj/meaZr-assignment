/**
 * This class is a dump components, used for getting new comments
 *
 * @name: CommentBox
 * @description: Component which show/hide based on the props, and intimate on new entering the comment
 */

import React from 'react';
import {Modal, FormGroup, Input, Button} from 'react-bootstrap';
import Slider from 'components/slider.react';

class CommentBox extends React.Component {
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
   * function to be called on clicking the save button
   */
  onSave = () => {
    if (this.refs.comment.value || this.slidevalue > -1)
      this.props.onSave(this.refs.comment.value, this.slidevalue);
  }

  /**
   * function to be called on clicking the close button
   */
  onClose = () => {
    this.props.onClose();
  }

  /**
   * on onchaning the slider value
   *
   * @param value - array of number
   */
   onSliderChange = (value) => {
     this.slidevalue = value;
   }

  render () {
    return (
      <Modal show={this.props.show}>
      <Modal.Header>
        <Modal.Title>Comment - <div className={"mzr-" + this.props.tag + "-badge mzr-comment-box-tag"}> {this.props.commentId} </div></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <FormGroup>
            <textarea ref="comment" className="form-control" placeholder="Enter your comment"/>
          </FormGroup>
        </div>
        <div className="clearafter">
          <div className="col-md-2 col-xs-2 no-p">
            <div className="content">
              <p className="last_p">Rate</p>
            </div>
          </div>
          <div className="col-md-10 col-xs-10">
            <div className="content">
              <Slider onSliderChange={this.onSliderChange} id={this.props.tag} tag={this.props.tag} value={this.props.rate}/>
            </div>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.onClose}>Close</Button>
        <Button bsStyle="primary" className="mzr-primary" onClick={this.onSave}>Save changes</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

CommentBox.propTypes = {
  show: React.PropTypes.bool,
  comment: React.PropTypes.string,
  commentId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  onSave: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  tag: React.PropTypes.string
};

export default CommentBox
