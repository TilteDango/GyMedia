import { Schema, model } from "mongoose";

const exerciceSchema = new Schema(
  {
    name: {
      type: String,
    },
    video: {
      type: String,
    },

    header: {
      type: String,
    },

    type: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Exercice = model("Exercice", exerciceSchema);

export default Exercice;
