import express from "express";
import {
  createCard,
  deleteCard,
  getAllCards,
  getCardById,
} from "../controllers/cardController.js";

const router = express.Router();

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.delete("/:id", deleteCard);

export default router;
