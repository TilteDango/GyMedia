import React from 'react'
import { RecipeContext, RecipeProvider } from '../../Context/RecipeContext'
import Recetas from './Recetas'
import NavBar from '../NavBar/NavBar'

export default function RecipesPage() {
  return (
    <>
    <NavBar />
    <RecipeProvider>
    <Recetas />
    </RecipeProvider>
    </>
  )
}
