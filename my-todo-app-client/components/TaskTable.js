export default function TaskTable({ tasks, onDelete, onEdit }) {
    return (
      <table className="min-w-full table-auto bg-white shadow-lg rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Due Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-100">
              {/* <td className="px-4 py-2 border">{task._id}</td> */}
              <td className="px-4 py-2 border">{task.title}</td>
              <td className="px-4 py-2 border">{task.description}</td>
              <td className="px-4 py-2 border">{task.status}</td>
              <td className="px-4 py-2 border">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => onEdit(task)}
                  className="bg-yellow-500 text-white p-2 rounded-md mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  