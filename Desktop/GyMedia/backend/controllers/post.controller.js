import Post from "../models/postSchema.js";
import jwt from "jsonwebtoken";
import config from "../src/config.js";

var image = "";

export const getAllPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
};

export const getAllPostsByToken = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const decoded = jwt.verify(token, config.SECRET);
  const tokenid = decoded.id;

  const posts = await Post.find({ creator: tokenid });
  res.status(200).json(posts);
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
};

export const deletePostById = async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);

  return res.status(200).json({ message: "Changes done succesfully" });
};

export const createPost = async (req, res) => {
  try {
    const { description, userInfo } = req.body;
    if (description === "") {
      return res.status(403).json({ message: "Missing attributes" });
    }
    const NewPost = new Post({
      image_path: image,
      description: description,
      creator: userInfo,
      liked_by: [],
      comments: [],
    });
    image = "";

    const savedPost = await NewPost.save();

    return res.status(200);
  } catch (e) {
    console.error(e);
  }
};
export const saveImage = async (req, res) => {
  image = "http://127.0.0.1:6001/assets/PostImages/" + req.file.filename;
  return res.status(200).json({ message: "Changes done succesfully" });
};

export const liked = async (req, res) => {
  const { postId, token } = req.body;

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const tokenid = decoded.id;

    const post = await Post.findById(postId);
    console.log(post);

    if (post.liked_by.includes(tokenid)) {
      await Post.findByIdAndUpdate(postId, { $pull: { liked_by: tokenid } });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $addToSet: { liked_by: tokenid },
      });
    }

    const updatedPost = await Post.findById(postId);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};
