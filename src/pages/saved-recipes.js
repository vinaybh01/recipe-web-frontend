import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();
  const URL = process.env.REACT_APP_BASIC_URL;
  const navigate = useNavigate();
  const verifyId = localStorage.getItem("userID");

  useEffect(() => {
    const verifyId = localStorage.getItem("userID");
    if (!verifyId) {
      navigate("/auth");
    }
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${URL}/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [userID, navigate, URL, verifyId]);
  return (
    <div className="">
      {verifyId ? (
        <div>
          <h1>Saved Recipes</h1>
          {loading ? (
            <Loading />
          ) : (
            <div className="res">
              {savedRecipes.map((recipe) => (
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
