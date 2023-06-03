import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const sneakerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: [String],
  features: {
    description: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
    },
    isAvailable: Boolean,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Sneaker = model("Sneaker", sneakerSchema, "sneakers");

export default Sneaker;
