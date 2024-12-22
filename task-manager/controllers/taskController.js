const Task = require("../models/task");

// Fetch all tasks
const getAllTasks1 = async (req, res) => {
  let { status, search, dueDate } = req.query;

  let query = {};

  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" }; 
  if(dueDate){
    dueDate = dueDate.trim();
 
    if (dueDate !== "" && dueDate !== "null" && !isNaN(new Date(dueDate))) { 
      console.log("getting inside",dueDate);
    const startDate = new Date(dueDate); // Start of the day
    const endDate = new Date(dueDate);
    endDate.setDate(endDate.getDate() + 1); // End of the day 
    query.dueDate = { $gte: startDate, $lt: endDate }; // Match documents within the range
  }
  }
  try {
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const getAllTasks = async (req, res) => {
  let { status, search, dueDate , page = 1, limit = 10} = req.query;

  let query = {};

  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" }; 
  if(dueDate){
    dueDate = dueDate.trim();
    console.log("dueDate exist", typeof dueDate);
  
    if (dueDate !== "" && dueDate !== "null" && !isNaN(new Date(dueDate))) { 
      console.log("getting inside",dueDate);
    const startDate = new Date(dueDate); 
    const endDate = new Date(dueDate);
    endDate.setDate(endDate.getDate() + 1);   
    query.dueDate = { $gte: startDate, $lt: endDate }; 
  }
  }
  
  try {
    const tasks = await Task.find(query)
    .skip((page - 1) * limit) // Skip items based on the page and limit
    .limit(limit) // Limit the number of results per page
    .sort({createdAt: -1 }); 
     const totalCount = await Task.countDocuments(query); // Get total count for pagination

    res.status(200).json({
      tasks,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    });  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

//  Add a task
const addTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  // Prevent past due dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const parsedDueDate = new Date(dueDate);
  if (parsedDueDate < today) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  // Prevent past due dates
  if (new Date(dueDate) < new Date()) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//  Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
