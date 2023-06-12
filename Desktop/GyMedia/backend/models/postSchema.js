import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    image_path: String,
    creator: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    description: String,
    liked_by: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = model("Post", postSchema);

export default Post;
