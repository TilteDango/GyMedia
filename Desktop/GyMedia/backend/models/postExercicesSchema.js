import { Schema, model } from "mongoose";

const postExercicesSchema = new Schema(
  {
    image_path: String,
    name: String,
    creator: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    description: String,
    frames: [],
    categories: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostExercices = model("PostExercices", postExercicesSchema);

export default PostExercices;
