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
  colors: [{ type: String }],
  features: [
    {
      description: [
        {
          type: String,
        },
      ],
      isAvailable: {
        type: Boolean,
      },
    },
  ],
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Sneaker = model("Sneaker", sneakerSchema, "sneakers");

export default Sneaker;
