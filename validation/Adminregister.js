const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdminRegisterInput(data) {
	let errors = {};
	data.restorentname = !isEmpty(data.restorentname) ? data.restorentname : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	// data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.restorentname, { min: 2, max: 30 })) {
		errors.restorentname = 'RestorentName must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(data.restorentname)) {
		errors.name = 'RestorentName field is required';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
