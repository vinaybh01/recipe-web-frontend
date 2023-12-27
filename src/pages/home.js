import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Hero from "../components/hero";
import "./home.css";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "../components/Loading";

export const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = process.env.REACT_APP_BASIC_URL;

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${URL}/recipes`);
        console.log(response.data);
        setRecipes(response.data);
        setLoading(false);
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
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`{URL}/recipes`, {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
      <div className="hero-section">
        <Hero />
      </div>
      <div className="other-section">
        <h1>
          <center>Latest Recipes!</center>
        </h1>
        <p>
          <center>
            Discover homemade recipes from around the world, shared by our
            community of passionate home cooks!
          </center>
        </p>
        {/* Recipes for next page  */}
        {/* <div className="res">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="resp">
              <div className="left-side">
                <h2>{recipe.name}</h2>
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div className="right-side">
                <div className="ingredients">
                  <p>
                    <span>Ingredients:</span>
                  </p>
                  <p>{recipe.ingredients[0]}</p>
                  <p> {recipe.ingredients[1]}</p>
                  <p> {recipe.ingredients[2]}</p>
                  <p> {recipe.ingredients[3]}</p>
                </div>
                <div className="instructions">
                  <p>
                    <span>Instructions:</span>
                  </p>
                  <p>{recipe.instructions}</p>
                </div>

                <p>
                  <span>Cooking Time:</span>
                </p>
                <p>{recipe.cookingTime} minutes</p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div> */}

        {loading ? (
          <Loading />
        ) : (
          <div>
            {" "}
            {recipes.length > 0 ? (
              <div className="recipe-wrapper">
                {recipes.map((data, index) => (
                  <div
                    className="recipe"
                    key={index}
                    onClick={() => navigate(`/recipe/${data._id}`)}
                  >
                    <img src={data.imageUrl} alt="" />
                    <div className="name">{data.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};
