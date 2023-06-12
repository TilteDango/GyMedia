import Exercice from "../models/exerciciesSchema.js";

export const createExercicie = async (req, res) => {
  const { name, video, header, type } = req.body;
  console.log(name, video, header, type);
  const newExercice = new Exercice({
    name: name,
    video: video,
    header: header,
    type: type,
  });

  const savedExercice = await newExercice.save();

  return res.status(200).json(savedExercice);
};

export const getExercices = async (req, res) => {
  const exercices = await Exercice.find();

  return res.status(200).json(exercices);
};
