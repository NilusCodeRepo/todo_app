import { useState, useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/taskUtils';
import PerformanceChart from '../components/PerformanceChart';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchTasks();
  }, [statusFilter, searchQuery, dateFilter,page]);

  // Fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const taskData = await getTasks(statusFilter, searchQuery, dateFilter || null,page, limit);
      setTasks(taskData.tasks);
      setTotalPages(taskData.totalPages);
    } catch (error) {
      toast.error('Error fetching tasks');
    }
  };

  // Handle Create or Edit task
  const handleCreateOrEditTask = async (task) => {
    console.log("Editing Task : ",editingTask);
    try {
      if (editingTask) {
        console.log("update task called : ",JSON.stringify(task));
        await updateTask(task);
        toast.success('Task updated successfully!');
      } else {
        await createTask(task);
        toast.success('Task created successfully!');
      }
      fetchTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      toast.error('Error creating or updating task');
    }
  };

  // Handle Delete task
  const handleDeleteTask = async (id) => {
    try {
      console.log("handleDeleteTask : ",id);
      await deleteTask(id);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center mb-4">Task Dashboard</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Task
        </button>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-md"
          />
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="border p-2 rounded-md"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            onChange={(e) => setDateFilter(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={fetchTasks}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Filter
          </button>
        </div>
      </div>
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleCreateOrEditTask}
          onClose={() => setShowForm(false)}
        />
      )}
      {/* <TaskTable tasks={tasks} onDelete={handleDeleteTask} onEdit={setEditingTask} /> */}
      <TaskTable tasks={tasks} onDelete={handleDeleteTask} onEdit={(task) => {
    setEditingTask(task); 
    setShowForm(true);    
  }}  />

<div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page <= 1}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
        >
          Previous
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page >= totalPages}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      <PerformanceChart tasks={tasks} />
    </div>
  );
}
