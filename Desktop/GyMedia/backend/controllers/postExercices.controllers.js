import PostExercices from "../models/postExercicesSchema.js";
import jwt from "jsonwebtoken";
import config from "../src/config.js";

var image_path;

export const savePostExercicePost = async (req, res) => {
  const filename = req.file.filename;
  console.log("Hola", filename);
  image_path = "http://127.0.0.1:6001/assets/PostExercices/" + filename;
  return res.status(200).json({ message: "File upload successfully" });
};

export const createExercicie = async (req, res) => {
  const { creator, description, categories, name } = req.body;
  const decoded = jwt.verify(creator, config.SECRET);
  const tokenid = decoded.id;
  const newExercice = new PostExercices({
    name: name,
    image_path,
    creator: tokenid,
    categories: categories,
    description: description,
  });

  const savedExercice = await newExercice.save();

  return res.status(200).json(savedExercice);
};

export const getExercices = async (req, res) => {
  const exercices = await PostExercices.find();

  return res.status(200).json(exercices);
};

export const getExercicesById = async (req, res) => {
  try {
    const { id } = req.body;
    const exercice = await PostExercices.findById(id);
    console.log(exercice);

    return res.status(200).json(exercice);
  } catch {
    return res.status(404).json({ message: "Exercicie not found" });
  }
};

export const getExercicesByToken = async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, config.SECRET);
  const tokenid = decoded.id;
  const exercices = await PostExercices.find({ creator: tokenid });

  return res.status(200).json(exercices);
};
