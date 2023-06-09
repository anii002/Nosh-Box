/* eslint-disable import/no-anonymous-default-export */
import { SET_CURRENT_ADMIN, SET_CURRENT_USER } from '../action/types';
import isEmpty from '../validation/is-empty';
const initialState = {
	isAuthenticated: false,
	user: {},
};
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case SET_CURRENT_ADMIN:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			}
		default:
			return state;
	}
}
