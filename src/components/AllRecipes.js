import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

import "../styles/components/AllRecipes.scss";

class AllRecipes extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(id, e) {
    this.props.history.push(`/recipes/${id}`);
  }

  render() {
    const recipes = this.props.recipes.map(recipe => (
      <RecipeCard
        key={recipe._id}
        handleClick={this.handleClick.bind(this, recipe._id)}
        {...recipe}
      />
    ));

    return <div className="all-recipes">{recipes}</div>;
  }
}

export default AllRecipes;
