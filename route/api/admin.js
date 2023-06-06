const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateAdminRegisterInput = require('../../validation/Adminregister');
const validateAdminLoginInput = require('../../validation/AdminLogin');
const validateAdminExtraDetails = require('../../validation/Adminextradetails');


// Load User model
const Admin = require("../../Model/Admin");


// Route for register
let newID = '';
router.post('/AdminRegister', (req, res) => {
	const { errors, isValid } = validateAdminRegisterInput(req.body);
	
	//  Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Admin.findOne({ email: req.body.email }).then((admin) => {
		
		if (admin) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newAdmin = new Admin ({
				restorentname: req.body.restorentname,
				email: req.body.email,
				password: req.body.password,
				phonenumber: "",
				Address: '',
				Country: '',
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.password, salt, (err, hash) => {
					if (err) throw err;
					newAdmin.password = hash;
					newAdmin
						.save()
						.then((saveadmin) => {
							newID = saveadmin.id;
							res.json(saveadmin);
						})
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// Routes for Extra details add
router.post('/AdminextraDetails', (req, res) => {
	const { errors, isValid } = validateAdminExtraDetails(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const newFields = {
		phonenumber: req.body.phonenumber,
		Address: req.body.Address,
		Country: req.body.Country,
	};
	Admin.findOneAndUpdate({ _id: newID }, { $set: newFields }, { new: true })
		.then((Admin) => {
			if (Admin) {
				res.json(Admin);
			}
			// res.json('User Not Found');
		})
		.catch((err) => res.json(err));
});

//complete profile
router.post('/completeProfile/:id', (req, res) => {
	const { errors, isValid } = validateAdminExtraDetails(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const id = req.params.id;
	const newFields = {
		phonenumber: req.body.phonenumber,
		Address: req.body.Address,
		Country: req.body.Country,
	};
	Admin.findOneAndUpdate({ _id: id }, { $set: newFields }, { new: true })
		.then((Admin) => {
			// if (Admin) {
			// 	res.json(Admin);
			// }
			res.json('Admin Not Found');
		})
		.catch((err) => res.json(err));
});

// login user and generate token
router.post('/testLogin', (req, res) => {
	const { errors, isValid } = validateAdminLoginInput(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	Admin.findOne({ email }).then((Admin) => {
		// Check for user
		if (!Admin) {
			errors.email = 'Admin not found';
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, Admin.password).then((isMatch) => {
			if (isMatch) {
				// User Matched
				const payload = { id: Admin.id, restorentname: Admin.restorentname }; // Create JWT Payload
				// Sign Token
				jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				});
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

router.get('/currentlogin', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.Admin.id,
		restorentname: req.Admin.restorentname,
		email: req.Admin.email,
		Address: req.Admin.Address,
		phonenumber: req.Admin.phonenumber,
		Country: req.Admin.Country,
	});
});

// Login User By token
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	Admin.findOne({ _id: req.Admin.id })
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this Admin';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});



// Deleting User and it's cart item
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	Cart.findOne({ Admin: req.Admin.id }).then((oneItem) => {
		if (oneItem) {
			Cart.findOneAndRemove({ _id: oneItem._id }).then(() => {
				Admin.findOneAndRemove({ _id: req.Admin.id }).then(() => {
					res.json({ success: true });
				});
			});
		}
	});
});

module.exports = router;

