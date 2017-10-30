var express = require('express');
var router = express.Router();
var taskService = require('../routes/services/task.service')
router.post('/task', taskService.tasks);
router.get('/userTasks', taskService.userTasks);
router.delete('/deleteTask/:delete_id', taskService.delUserTask);
router.put('/updateTask/:update_id', taskService.editUserTask);

module.exports = router;