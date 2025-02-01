const Task = require("../models/tasks.model");
const mongoose = require("mongoose");

const addNewTask = async (req, res) => {
  try {
    const newTask = req.body;
    const addedTask = await Task.create(newTask);
    res.status(201).json({ message: "Task added successfully.", addedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add new task.", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { team, owner, tags, project, status } = req.query;

    console.log(team, owner, tags, project, status);

    // Build filter object
    let filter = {};

    if (team) {
      filter.team = team; // Assuming `team` is an ObjectId
    }

    if (owner) {
      filter.owners = owner; // Assuming `owner` is an ObjectId
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") }; // Match any tag in the array
    }

    if (project) {
      filter.project = project; // Assuming `project` is an ObjectId
    }

    if (status) {
      filter.status = status; // Exact match for status
    }

    // Fetch tasks with filters and populate references
    const tasks = await Task.find(filter)
      .populate("project", "name") // Populate project with name only
      .populate("team", "name") // Populate team with name only
      .populate("tags") // Populate tag with name only
      .populate("status") // Populate status with name only
      .populate("owners", "name email"); // Populate owners with name and email

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Get task ID from the request params
    const updateData = req.body; // Get updated data from the request body

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules in the schema are applied
    })
      .populate("project")
      .populate("team")
      .populate("owners");

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the task", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Get the task ID from the request parameters

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    // Attempt to find and delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete the task", error: error.message });
  }
};

module.exports = { addNewTask, getTasks, updateTask, deleteTask };
