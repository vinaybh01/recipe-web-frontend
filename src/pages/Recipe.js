import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./home.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const verifyId = localStorage.getItem("userID");
  const [recipes, setRecipes] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const URL = process.env.REACT_APP_BASIC_URL;

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${URL}/recipes/${id}`);
        console.log(response.data);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${URL}/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [id]);

  const saveRecipe = async (recipeID) => {
    if (!verifyId) {
      navigate("/auth");
    }
    try {
      const response = await axios.put(`${URL}/recipes`, {
        recipeID: id,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <div className="res">
        {recipes ? (
          <div key={recipes._id} className="resp">
            <div className="left-side">
              <h2>{recipes.name}</h2>
              {/* <p>{recipes.description}</p> */}
              <img src={recipes.imageUrl} alt={recipes.name} />
            </div>
            <div className="right-side">
              <div className="ingredients">
                <p>
                  <span>Ingredients:</span>
                </p>
                <p>{recipes.ingredients[0]}</p>
                <p> {recipes.ingredients[1]}</p>
                <p> {recipes.ingredients[2]}</p>
                <p> {recipes.ingredients[3]}</p>
              </div>
              <div className="instructions">
                <p>
                  <span>Instructions:</span>
                </p>
                <p>{recipes.instructions}</p>
              </div>

              <p>
                <span>Cooking Time:</span>
              </p>
              <p>{recipes.cookingTime} minutes</p>
              <button
                onClick={() => saveRecipe(recipes._id)}
                disabled={isRecipeSaved(recipes._id)}
              >
                {isRecipeSaved(recipes._id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Recipe;
