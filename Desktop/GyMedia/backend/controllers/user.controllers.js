import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import config from "../src/config.js";

export const updateAvatarImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const decoded = jwt.verify(userId, config.SECRET);
    const tokenid = decoded.id;
    const filename = "http://127.0.0.1:6001/assets/Avatar/" + req.file.filename;
    const userFound = await User.findByIdAndUpdate(tokenid, {
      image: filename,
    });
    return res.json({ message: "Changes done succesfully" });
  } catch (e) {
    console.log(e);
  }
};

export const updateBackgroundImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const decoded = jwt.verify(userId, config.SECRET);
    const tokenid = decoded.id;
    const filename =
      "http://127.0.0.1:6001/assets/Background/" + req.file.filename;
    const userFound = await User.findByIdAndUpdate(tokenid, {
      background_image: filename,
    });
    return res.json({ message: "Changes done succesfully" });
  } catch (e) {
    console.log(e);
  }
};

export const getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await User.findById(userId);

    return res.status(200).json(userInfo);
  } catch (error) {
    return res.json(error);
  }
};

export const getUserInfoByUserName = async (req, res) => {
  const { username } = req.params;

  try {
    const userInfo = await User.findOne({ username });

    return res.status(200).json(userInfo);
  } catch (error) {
    return res.json(error);
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { userId, fullname, address, job, studies, description } = req.body;
    const userFound = await User.findByIdAndUpdate(userId, {
      fullname: fullname,
      address: address,
      job: job,
      studies: studies,
      description: description,
    });
    return res.json({ message: "Changes done succesfully" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const addToShoppingList = async (req, res) => {
  const { recipeId, token, list } = req.body;

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const tokenid = decoded.id;

    const shoppingList = await User.findById(tokenid);
    shoppingList.list.push(...list);
    await shoppingList.save();

    return res.status(200).json(shoppingList);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const getShoppingList = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const tokenid = decoded.id;

    const shoppingList = await User.findById(tokenid);

    return res.status(200).json(shoppingList.list);
  } catch (error) {
    return res.status(403).json({ message: "User not found" });
  }
};
