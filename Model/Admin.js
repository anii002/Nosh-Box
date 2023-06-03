const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
	restorentname: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: false,
	},
	phonenumber: {
		type: String,
		required: false,
	},
	Address: {
		type: String,
		required: false,
	},
	Country: {
		type: String,
		required: false,
	},
});

module.exports = Admin = mongoose.model('admin', AdminSchema);
