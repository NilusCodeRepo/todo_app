const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Get all tasks
router.get('/tasks', getAllTasks);

// Add a task
router.post('/tasks', addTask);

// Update a task
router.put('/tasks/:id', updateTask);

// Delete a task
router.delete('/tasks/:id', deleteTask);

module.exports = router;
