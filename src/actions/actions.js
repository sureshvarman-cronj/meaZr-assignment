/**
 * Actions - given contents are dispatched to the reducer
 * inbuild using redux-async-transitions
 */

import * as types from 'constants';

/**
 * addComments - function to dispatch the content from
 *
 * @param id - string/number
 * @param tag - string,
 * @param comment - string,
 * @param position - object/string
 * @param slidervalue - number
 */
export function addComments(id, tag, comment, position, slidervalue) {
  return {
    type: types.ADD_COMMENTS,
    payload: {
      id,
      tag,
      comment,
      position,
      slidervalue
    }
  };
}

/**
 * updateComment - function to dispatch the updated comments
 *
 * @param id - number
 * @param newData - object
 */
export function updateComment(id, newData) {
  return {
    type: types.UPDATE_COMMENT,
    payload: {
      id, newData
    }
  }
}
