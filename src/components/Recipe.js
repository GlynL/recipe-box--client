import React, { Component } from "react";
import { RingLoader } from "react-spinners";
import "../styles/components/Recipe.scss";
import defaultRecipe from "../assets/default-recipe.jpg";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "Recipe",
        image: "",
        ingredients: [],
        method: [],
        _id: ""
      },
      loading: true,
      userRecipe: false
    };

    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    // find recipe that matches id in route - ensure recipes array is populated first
    if (this.props.match && this.props.recipes.length > 0) {
      return this.findRecipe();
    }
    if (this.props.recipe) {
      this.setState({ recipe: this.props.recipe, loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    // check for change in props -- necessary if array needed time to populate
    if (this.props.recipes && this.props.recipes !== prevProps.recipes)
      this.findRecipe();
    if (this.props.recipe && this.props.recipe !== prevProps.recipe) {
      this.setState({ recipe: this.props.recipe });
    }
  }

  findRecipe() {
    const id = this.props.match.params.id;
    const recipe = this.props.recipes.find(recipe => recipe._id === id);
    const userRecipe = recipe.author === this.props.user.info.id ? true : false;
    this.setState({ recipe, loading: false, userRecipe });
  }

  handleClickEdit(e) {
    const id = this.state.recipe._id;
    this.props.history.push(`/recipes/edit/${id}`);
  }

  handleClickDelete(e) {
    const id = this.state.recipe._id;
    const recipe = this.props.recipes.find(recipe => recipe._id === id);
    this.props.removeRecipe(recipe);
    this.props.history.push("/recipes");
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="recipe">
          <RingLoader color={"#123abc"} loading={this.state.loading} />
        </div>
      );
    }
    return (
      <div className="recipe">
        <h2 className="recipe__title">{this.state.recipe.name}</h2>
        <img
          className="recipe__image"
          src={
            this.state.recipe.image
              ? this.state.recipe.image.url
              : defaultRecipe
          }
          alt={`${this.state.recipe.name} image`}
        />
        <h3 className="recipe__subtitle">Ingredients</h3>
        <ul className="recipe__list recipe__list--unordered">
          {this.state.recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient}
              {this.props.editRecipe && (
                <button
                  className="btn"
                  onClick={e =>
                    this.props.handleRemove(e, "ingredients", ingredient, idx)
                  }
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
        <h3 className="recipe__subtitle">Method</h3>
        <ol className="recipe__list recipe__list--ordered">
          {this.state.recipe.method.map((step, idx) => (
            <li key={idx}>
              {step}
              {this.props.editRecipe && (
                <button
                  className="btn"
                  onClick={e =>
                    this.props.handleRemove(e, "method", method, idx)
                  }
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ol>
        {this.state.userRecipe && (
          <div className="recipe__buttons">
            <button className="btn" onClick={this.handleClickEdit}>
              Edit
            </button>
            <button className="btn" onClick={this.handleClickDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
