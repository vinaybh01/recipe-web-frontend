import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import Photo from "../components/images/photo.jpg";
import Photoo from "../components/images/photo.avif";
import "./create-recipe.css";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const URL = process.env.REACT_APP_BASIC_URL;

  const navigate = useNavigate();
  const verifyId = localStorage.getItem("userID");

  useEffect(() => {
    const verifyId = localStorage.getItem("userID");
    if (!verifyId) {
      navigate("/auth");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${URL}/recipes`,
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe">
      {verifyId ? (
        <div className="create-recipe">
          <h2>Create Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipe.name}
                onChange={handleChange} 
                placeholder="Recipe Name"
              />
            </div>
            <div className="name">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
              ></input>
            </div>
            <div className="name">
              <label htmlFor="ingredients">Ingredients</label>
              {recipe.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  name="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientChange(event, index)}
                />
              ))}
              <button
                type="button"
                className="inst"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
            </div>

            <div className="name">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="name">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="name">
              <label htmlFor="cookingTime">Time (min)</label>
              <input
                type="number"
                id="cookingTime"
                name="cookingTime"
                value={recipe.cookingTime}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit">
              Create Recipe
            </button>
          </form>
        </div>
      ) : (
        "null"
      )}
    </div>
  );
};
