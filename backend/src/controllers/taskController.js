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
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.completed) {
      return res.status(400).json({ message: "Task already completed" });
    }

    task.completed = true;
    await task.save();

    // Update card streak logic
    const card = await Card.findById(task.cardId);
    if (card) {
      const today = new Date().toDateString();
      const last = card.lastCompletedDate
        ? new Date(card.lastCompletedDate).toDateString()
        : null;

      if (last !== today) {
        card.streak += 1;
        card.lastCompletedDate = new Date();
        await card.save();
      }
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
