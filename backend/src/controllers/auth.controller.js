import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { HttpError } from "../utils/HttpError.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import cloudinary from "../config/cloudinary.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new HttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
    expiresIn: "30d",
  });
  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    token,
    user: newUser.toPublicJSON(),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" });
  user.token = token;
  await user.save();

  res.json({
    token,
    user: user.toPublicJSON(),
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
};

const getCurrent = async (req, res) => {
  res.json(req.user.toPublicJSON());
};

const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { password, ...rest } = req.body;

  const update = { ...rest };

  if (update.email && update.email !== req.user.email) {
    const existingUser = await User.findOne({ email: update.email });
    if (existingUser) {
      throw new HttpError(409, "Email is already in use");
    }
  }

  if (password) {
    update.password = await bcrypt.hash(password, 10);
  }

  if (req.file) {
    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "taskpro/avatars",
    });
    update.avatarURL = result.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, update, {
    new: true,
  });

  res.json(updatedUser.toPublicJSON());
};

const updateTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { theme },
    { new: true }
  );

  res.json(updatedUser.toPublicJSON());
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
  updateTheme: ctrlWrapper(updateTheme),
};
