const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Notes', ToDoSchema);
