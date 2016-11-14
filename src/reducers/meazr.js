/**
 * Reducers, an simple datastore for comments and contents
 * related to the meazr application
 */

import * as types from 'constants';
import { createReducer } from 'redux-create-reducer';
import sample from 'utils/samples/sample.json';

const initialState = {
	videosrc: 'http://vjs.zencdn.net/v/oceans.mp4',
	text: sample.text,
	tags: {
		text: 'text',
		video: 'video'
	},
	comments: []
};

export default createReducer(initialState, {
	[types.ADD_COMMENTS](state, action) {
		let {id, tag, comment, position, slidervalue} = action.payload;
		let comments = state.comments;
		comments.push({
			tag,
			text: comment,
			position: position,
			rate: slidervalue
		});
		return {
			...state,
			comments
		};
	},
	[types.UPDATE_COMMENT](state, action) {
		let {id, newData} = action.payload;
		let comments = state.comments;
		comments[id] = newData;
		return {
			...state,
			comments
		}
	}
});
