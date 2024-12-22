import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const statuses = ["Pending", "In Progress", "Completed"];

export default function TaskForm({ task, onSave, onClose }) {
  const [_id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (task) {
      setId(task._id);
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(new Date(task.dueDate));
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !status || !dueDate) {
      alert('All fields are required');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part 
    if (dueDate < today) {
      alert('Due date cannot be in the past');
      return;
    }
    console.log("task : "+task);
    onSave({ _id: task ? task._id : null,title, description, status, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{task ? 'Edit Task' : 'Create Task'}</h2>
      {/* <input
        type="text"
        placeholder="Id"
        value={_id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      /> */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />
      <select
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        className="border p-2 w-full mb-4 rounded-md"
      >
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        className="border p-2 w-full mb-4 rounded-md"
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
