import Task from "../models/Task.js";
import Card from "../models/Card.js";

export const createTask = async (req, res) => {
  try {
    const { text, cardId } = req.body;
    const task = new Task({ text, cardId });
    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.log("Error in createTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = true;
    await task.save();

    const card = await Card.findById(task.cardId);
    const today = new Date().toDateString();

    if (card.lastCompletedDate !== today) {
      card.streak += 1;
      card.lastCompletedDate = today;
      await card.save();
    }

    res.json({ task, card });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.log("Error in deleteTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
