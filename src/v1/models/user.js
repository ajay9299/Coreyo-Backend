import mongoose from "mongoose";
const {model,Schema} = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    index: {
        unique: true,
        partialFilterExpression: { phone: { $type: "string" } },
      },
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model("user", UserSchema);
