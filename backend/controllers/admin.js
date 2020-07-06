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
	res.render('edit-todo', { editing: false });
};

exports.getEditToDo = (req, res) => {
	const editMode = req.query.edit;

	if (!editMode) {
		return res.redirect('/todo');
	}

	const todoId = req.params.todoId;

	Notes.findById(todoId).then((note) => {
		if (!note) {
			return res.redirect('/todo');
		}
		res.render('edit-todo', { note: note, editing: editMode });
	});
};

exports.postAddToDo = (req, res) => {
	const { title, notes, priority, image, progress, workRate, procrastination } = req.body;

	const todo = new Notes({
		title: title,
		notes: notes,
		priority: priority,
		image: image,
		progress: progress,
		workRate: workRate,
		procrastination: procrastination,
	});
	todo.save();
	console.log('Task Added');
	res.status(201).redirect('/todo');
};

exports.postEditToDo = (req, res) => {
	const noteId = req.body.noteId;
	const { title, notes, priority, image, progress, workRate, procrastination } = req.body;

	Notes.findById(noteId)
		.then((note) => {
			note.title = title;
			note.notes = notes;
			note.priority = priority;
			note.image = image;
			note.progress = progress;
			note.workRate = workRate;
			note.procrastination = procrastination;

			return note.save();
		})
		.then(() => {
			res.status(200).redirect('/todo');
		})
		.catch((error) => {
			console.log(error);
		});
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
