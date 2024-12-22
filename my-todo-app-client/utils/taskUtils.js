const API_URL = process.env.NEXT_PUBLIC_API_URL;  

export const getTasks = async (status = '', search = '', dueDate = null, page, limit) => {
  const queryParams = new URLSearchParams({
    status,
    search,
    dueDate,
    page,
    limit
  });

  try {
    console.log(API_URL);
    const res = await fetch(`${API_URL}?${queryParams}`);
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await res.json(); 
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (task) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error('Failed to create task');
    }
    return await res.json(); 
  } catch (error) {
    console.error(error);
    throw new Error('Error creating task');
  }
};

export const updateTask = async (updatedTask) => {
  try {
    console.log("updatedTask : ",JSON.stringify(updatedTask));
    const res = await fetch(API_URL + '/' + updatedTask._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!res.ok) {
      throw new Error('Failed to update task');
    }
    return await res.json(); 
  } catch (error) {
    console.error(error);
    throw new Error('Error updating task');
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
    return await res.json(); 
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting task');
  }
};
