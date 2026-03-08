import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";

async function islogin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "You need to login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_Code);

    const user = await UserModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

   return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function isSystemUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "You need to login first" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_Code);

    const user = await UserModel.findById(decode.id).select("+systemUser");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!user.systemUser) {
      return res.status(401).json({ message: "you dont have access" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export default {islogin,isSystemUser};