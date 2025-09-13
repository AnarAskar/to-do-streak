import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
