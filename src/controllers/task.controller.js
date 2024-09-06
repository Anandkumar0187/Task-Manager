import { Task } from "../models/task.model.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    if (!tasks) return res.status(404).json({ msg: "No tasks found" });
    res.status(200).json(tasks);
  } catch (err) {
    console.log("🚀 ~ getTasks ~ err:", err);
    res.status(500).json({
      status : "Failure",
      msg : err.message
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log("🚀 ~ getTaskById ~ task:", task)
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    console.log("🚀 ~ getTaskById ~ err:", err);
    res.status(500).json({
      status : "Failure",
      msg : err.message
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.log("🚀 ~ createTask ~ err:", err);
    res.status(500).json({
      status : "Failure",
      msg : err.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (err) {
    console.log("🚀 ~ updateTask ~ err:", err);
    res.status(500).json({
      status : "Failure",
      msg : err.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task deleted" });
  } catch (err) {
    console.log("🚀 ~ deleteTask ~ err:", err);
    res.status(500).json({
      status : "Failure",
      msg : err.message
    });
  }
};

export { getTasks, getTaskById, createTask, deleteTask, updateTask };
