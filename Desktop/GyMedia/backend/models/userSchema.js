import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    background_image: {
      type: String,
    },
    fullname: {
      type: String,
    },
    address: {
      type: String,
    },
    job: {
      type: String,
    },
    studies: {
      type: String,
    },
    description: {
      type: String,
    },
    liked_posts: [
      {
        ref: "Recipe",
        type: Schema.Types.ObjectId,
      },
    ],
    created_posts: [
      {
        ref: "Recipe",
        type: Schema.Types.ObjectId,
      },
    ],
    list: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error(error);
  }
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const user = model("User", userSchema);

export default user;
