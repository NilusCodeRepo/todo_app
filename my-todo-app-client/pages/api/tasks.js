import { getTasks, createTask, updateTask, deleteTask } from '../../utils/taskUtils';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { statusFilter, searchQuery, dateFilter } = req.query;
      const tasks = getTasks(statusFilter, searchQuery, dateFilter);
      res.status(200).json(tasks);
      break;

    case 'POST':
      const { title, description, status, dueDate } = req.body;
      const newTask = createTask({ title, description, status, dueDate });
      res.status(201).json(newTask);
      break;

    case 'PUT':
      const { _id, updatedTitle, updatedDescription, updatedStatus, updatedDueDate } = req.body;
      const updatedTask = updateTask({
        _id,
        title: updatedTitle,
        description: updatedDescription,
        status: updatedStatus,
        dueDate: updatedDueDate,
      });
      res.status(200).json(updatedTask);
      break;

    case 'DELETE':
      //Delete a task
      const { id: taskId } = req.query;
      deleteTask(taskId);
      res.status(200).json({ message: 'Task deleted' });
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
