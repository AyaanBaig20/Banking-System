import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
async function userRegister(req, res) {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "field cannot be empty" });
  }

  let isexist = await UserModel.findOne({ email });

  if (isexist) {
    return res.json({
      message: "user exist with this email",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const newuser = new UserModel({
    name,
    email,
    password: hash,
  });

  await newuser.save();

  let token = jwt.sign({ id: newuser._id }, process.env.JWT_Code);

  res.cookie("token", token);

  res.json({ token, message: "user created successfully" });
}

// login
async function userLogin(req, res) {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "field cannot be empty" });
  }

  let isexist = await UserModel.findOne({ email }).select("+password");

  if (!isexist) {
    return res.json({
      message: "user does not exist",
    });
  }

  const result = await bcrypt.compare(password, isexist.password);

  if (!result) {
    return res.json({
      message: "password incorrect",
    });
  }

  let token = jwt.sign(
    { id: isexist._id},
    process.env.JWT_Code,
  );

  res.cookie("token", token);

  res.json({
    message: "login successful",
    token,
  });
}
export default { userRegister,userLogin };
