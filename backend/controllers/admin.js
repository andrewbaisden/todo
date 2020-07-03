const Notes = require('../models/Todo');

exports.getIndex = async (req, res) => {
	res.render('index');
};

exports.getToDos = async (req, res) => {
	const todos = await Notes.find((note) => note);

	try {
		console.log(todos);
		res.render('todos', { todos: todos });
	} catch (error) {
		console.log(error);
	}
};

exports.getToDo = async (req, res) => {
	const todoId = req.params.todoId;

	console.log(todoId);

	const todo = await Notes.findById(todoId, (todo) => todo);

	try {
		console.log(todo);
		res.render('todo', { todo: todo });
	} catch (error) {
		console.log(error);
	}
};

exports.getAddToDo = (req, res) => {
	res.render('edit-todo');
};

exports.postAddToDo = (req, res) => {
	const { title, notes, priority, image } = req.body;

	const todo = new Notes({ title: title, notes: notes, priority: priority, image: image });
	todo.save();
	console.log('Task Added');
	res.status(201).redirect('/todo');
};

exports.postDeleteToDo = async (req, res) => {
	const todoId = req.body.todoId;

	const todo = await Notes.findByIdAndDelete(todoId, (todo) => todo);

	try {
		console.log(todo, 'Task Deleted');
		res.status(200).redirect('/todo');
	} catch (error) {
		console.log(error);
	}
};
