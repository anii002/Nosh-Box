/* eslint-disable no-unused-vars */
import axios from 'axios';
import { GET_ERRORS, PROFILE_LOADING, SET_CURRENT_ADMIN } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import swal from 'sweetalert';

export const registerAdmin = (AdminData, history) => (dispatch) => {
	axios.post('/api/admin/AdminRegister', AdminData)
		.then((res) => history.push('/AdminextraDetails'))
		
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
// Extra Details of user
export const AdminextraDetails = (AdminData, history) => (dispatch) => {
	
	axios.post('/api/admin/AdminextraDetails', AdminData)
		.then((res) => {
			swal('Good job!', 'Your Account Created Successfully!', 'success');
			history.push('/Adminlogin');
		})

		
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
// Extra Details of user
// export const completeProfile = (AdminData, id) => (dispatch) => {
// 	axios.post(`/api/admin/completeProfile/${id}`, AdminData)
// 		.then((res) => {
// 			window.location.href = '/adminMoms';
// 			// history.push('/Dashboard');
// 		})
// 		.catch((err) =>
// 			dispatch({
// 				type: GET_ERRORS,
// 				payload: err.response.data,
// 			})
// 		);
// };

export const loginAdmin = (adminData) => (dispatch) => {
	axios.post('/api/admin/testLogin', adminData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentAdmin(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// //delete user
// export const deleteAccount = (history) => (dispatch) => {
// 	if (window.confirm("Are you sure? This can't be Undone!")) {
// 		axios.delete('/api/admin/delete')
// 			.then((res) => {
// 				dispatch({
// 					type: SET_CURRENT_ADMIN,
// 					payload: {},
// 				});
// 			})
// 			.catch((err) =>
// 				dispatch({
// 					type: GET_ERRORS,
// 					payload: err.response.data,
// 				})
// 			);
// 	}
// 	return {
// 		type: PROFILE_LOADING,
// 	};
// };

// Set logged in user
export const setCurrentAdmin = (decoded) => {
	return {
		type: SET_CURRENT_ADMIN,
		payload: decoded,
	};
};

//  Log user out
export const logoutAdmin = () => (dispatch) => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentAdmin({}));
};
