import React from "react";
import "../styles/components/Recipe.scss";
import "../styles/components/RecipeCard.scss";
import defaultRecipeImage from "../assets/default-recipe.jpg";

const RecipeCard = props => (
  <div className="recipe recipe--card" onClick={props.handleClick}>
    <h2 className="recipe__title">{props.name || "Recipe"}</h2>
    <img src={props.image.url} alt={`${props.name} image`} />
  </div>
);

RecipeCard.defaultProps = {
  handleClick: () => {},
  name: "Recipe",
  image: { url: defaultRecipeImage }
};

export default RecipeCard;
