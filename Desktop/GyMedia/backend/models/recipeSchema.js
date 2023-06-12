import { Schema, model } from "mongoose"

const recipeSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type :String,
      required : true
    },
    username: String,
    img: String,
    category: String,
    stars: Number,
    reviews: Number,
    cookingtime : Number,
    ingredients : Array,
    steps : Array,
    persons : Number
  }, {
    timestamps : true,
    versionKey : false
  })


  const Recipe = model('Recipe', recipeSchema)

export default Recipe