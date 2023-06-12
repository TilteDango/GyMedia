import Recipe from "../models/recipeSchema.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import config from "../src/config.js";

export const getRecipePosts = async (req, res) => {
  const { token, active } = req.body;
  if (token == null) {
    try {
      const recipe = await Recipe.find();

      res.status(200).json(recipe);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    let userFound;
    let tokenid;
    try {
      const decoded = jwt.verify(token, config.SECRET);
      tokenid = decoded.id;

      userFound = await User.findById(tokenid);
    } catch (error) {
      return res.status(404).json({ message: "Token decoding error" });
    }

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    if (active) {
      const likedPosts = userFound.liked_posts;
      const createdPosts = userFound.created_posts;
      const likedRecipes = await Recipe.find({ _id: { $in: likedPosts } });
      const createdRecipes = await Recipe.find({ _id: { $in: createdPosts } });
      const createdAndLikedRecipes = [];
      const result = [];

      createdRecipes.forEach((createdRecipe) => {
        const index = likedPosts.indexOf(createdRecipe._id);
        if (index !== -1) {
          const createdAndLikedRecipe = {
            ...createdRecipe.toJSON(),
            liked: true,
            created: true,
            createdAndLiked: true,
          };
          createdAndLikedRecipes.push(createdAndLikedRecipe);
          likedPosts.splice(index, 1);
        } else {
          const createdRecipeObj = {
            ...createdRecipe.toJSON(),
            liked: false,
            created: true,
            createdAndLiked: false,
          };
          result.push(createdRecipeObj);
        }
      });

      likedRecipes.forEach((likedRecipe) => {
        const likedRecipeObj = {
          ...likedRecipe.toJSON(),
          liked: true,
          created: false,
          createdAndLiked: false,
        };
        if (!createdPosts.includes(likedRecipe._id)) {
          result.push(likedRecipeObj);
        }
      });

      createdAndLikedRecipes.forEach((createdAndLikedRecipe) => {
        if (
          !result.some((recipe) => recipe._id === createdAndLikedRecipe._id)
        ) {
          result.push(createdAndLikedRecipe);
        }
      });

      return res.status(200).json(result);
    } else {
      const likedPosts = userFound.liked_posts;
      const recipes = await Recipe.find();
      const result = recipes.map((recipe) => ({
        ...recipe.toJSON(),
        liked: likedPosts.includes(recipe._id),
        created: false,
        createdAndLiked: false,
      }));
      return res.status(200).json(result.reverse());
    }
  }
};

export const createRecipePost = async (req, res) => {
  let {
    title,
    description,
    category,
    cookingTime,
    token,
    img,
    ingredients,
    steps,
    persons,
  } = req.body;
  if (
    title == "" ||
    description == "" ||
    category == "" ||
    cookingTime == "" ||
    ingredients == [] ||
    steps == []
  ) {
    return res.status(403).json({ message: "Missing required attributes" });
  } else {
    let userFound;
    let tokenid;
    try {
      const decoded = jwt.verify(token, config.SECRET);
      tokenid = decoded.id;

      userFound = await User.findById(tokenid);
    } catch (error) {
      return res.status(404).json({ message: "Token decoding error" });
    }

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const username = userFound.username;

    const NewRecipe = new Recipe({
      title,
      description,
      username,
      img,
      category,
      stars: 0,
      reviews: 0,
      cookingTime,
      ingredients,
      steps,
      persons,
    });

    const savedRecipe = await NewRecipe.save();
    await User.findByIdAndUpdate(tokenid, {
      $push: { created_posts: savedRecipe.id },
    });
    const imgId = NewRecipe._id;
    return res.json({ imgId });
  }
};

export const getRecipePostById = async (req, res) => {};

export const updateRecipePostsById = async (req, res) => {
  const { token, recipeID, like } = req.body;

  let userFound;
  let tokenid;
  let recipeFound;
  try {
    const decoded = jwt.verify(token, config.SECRET);
    tokenid = decoded.id;
    userFound = await User.findById(tokenid);
  } catch (error) {
    return res.status(404).json({ message: "Token decoding error" });
  }

  try {
    recipeFound = await Recipe.findById(recipeID);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found " });
  }

  if (!userFound) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!recipeFound) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  if (like) {
    if (!userFound.liked_posts.includes(recipeID)) {
      await User.findByIdAndUpdate(tokenid, {
        $push: { liked_posts: recipeID },
      });
    }
  } else {
    await User.findByIdAndUpdate(tokenid, { $pull: { liked_posts: recipeID } });
  }

  return res.json({ message: "Changes done succesfully" });
};

export const deleteRecipePostById = async (req, res) => {
  const { token, recipeID } = req.body;

  let userFound;
  let tokenid;
  let recipeFound;
  try {
    const decoded = jwt.verify(token, config.SECRET);
    tokenid = decoded.id;
    userFound = await User.findById(tokenid);
  } catch (error) {
    return res.status(404).json({ message: "Token decoding error" });
  }

  try {
    recipeFound = await Recipe.findById(recipeID);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found " });
  }

  if (!recipeFound) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const allUsers = await User.find({});
  allUsers.forEach(async (user) => {
    if (user.liked_posts.includes(recipeID)) {
      user.liked_posts.pull(recipeID);
      await user.save();
    }
  });

  await Recipe.findByIdAndDelete(recipeID);
  await User.findByIdAndUpdate(tokenid, { $pull: { created_posts: recipeID } });

  return res.status(200).json({ message: "Changes done succesfully" });
};

export const putImage = async (req, res) => {
  const { imgId } = req.body;
  let img = "http://127.0.0.1:6001/assets/RecipeHeaders/DefaultPhoto.jpg";
  if (req.file) {
    img = "http://127.0.0.1:6001/assets/RecipeHeaders/" + req.file.filename;
  }

  const recipe = await Recipe.findByIdAndUpdate(imgId, { img: img });

  if (!recipe) {
    return res.status(404).json({ messsage: "Recipe not found" });
  }

  return res.status(200).json({ message: "Changes done succesfully" });
};

export const addReview = async (req, res) => {
  const { idRecipe, stars, token } = req.body;

  try {
    const recipe = await Recipe.findById(idRecipe);

    recipe.reviews += 1;
    recipe.stars = ((recipe.stars + stars) / recipe.reviews).toFixed(2);
    await recipe.save();

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found" });
  }
};
