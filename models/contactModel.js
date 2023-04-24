const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ContactSchema = Schema({

	fName: {
		type: String,
		required: true,
		minlength: [1, "not long enuf"]
		
	},
	lName: {
		type: String,
		required: true,
		
	},

	email: {
		type: String,
		required: true,
		
	},

	phone: {
		type: String,
		required: true,
		
	},

	imageUrl: {
		type: String,
		required: true,
		
	}
	
});

module.exports = mongoose.model("Contact", ContactSchema);
