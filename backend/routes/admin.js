const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-todo', adminController.getAddToDo);

router.post('/add-todo', adminController.postAddToDo);

router.get('/todo', adminController.getToDos);

router.get('/todo/:todoId', adminController.getToDo);

module.exports = router;
