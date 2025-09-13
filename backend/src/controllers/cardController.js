import Card from "../models/Card.js";
import Task from "../models/Task.js";

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.log("Error in getAllCards controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    const tasks = await Task.find({ cardId: card._id });

    res.status(200).json({ card, tasks });
  } catch (error) {
    console.log("Error in getCardById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = new Card({ title: req.body.title });
    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.log("Error in createCard controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const taskDeleted = await Task.deleteMany({ cardId: req.params.id });
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCard controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
