import mongoose, { Schema } from "mongoose";

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password should be longer "],
    select: false,
  },
  systemUser: {
    type: Boolean,
    immutable: true,
    default: false,
    select: false,
  },
});

const UserModel = new mongoose.model("user", userSchema);
export default UserModel;
