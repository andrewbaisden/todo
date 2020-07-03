const Notes = require('../models/Todo');

exports.getIndex = (req, res) => {
	res.render('index');
};

exports.getAddToDo = (req, res) => {
	res.render('edit-todo');
};

exports.postAddToDo = (req, res) => {
	const { title, notes, priority, image } = req.body;

	const todo = new Notes({ title: title, notes: notes, priority: priority, image: image });
	todo.save();
	console.log('Task Added');
	res.status(201).redirect('/');
};
