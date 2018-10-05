import React, { Component } from "react";
import Recipe from "./Recipe";
import UserPrompt from "./UserPrompt";
import "../styles/components/NewRecipe.scss";
import defaultRecipeImage from "../assets/default-recipe.jpg";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "Recipe Title",
        image: {
          url: defaultRecipeImage,
          upload: ""
        },
        ingredients: [],
        method: []
      },
      ingredientInput: "",
      methodInput: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
    this.handleMethodSubmit = this.handleMethodSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addRecipe(this.state.recipe);
    window.URL.revokeObjectURL(this.state.recipe.image.url);
    const recipe = {
      name: "",
      image: {
        image: defaultRecipeImage,
        upload: ""
      },
      ingredients: [],
      method: []
    };
    this.setState({ recipe, ingredientInput: "", methodInput: "" });
    this.props.history.push("/recipes");
  }

  handleNameChange(e) {
    const recipe = { ...this.state.recipe, name: e.target.value };
    this.setState({ recipe });
  }

  handleFileChange(e) {
    const url = window.URL.createObjectURL(e.target.files[0]);
    const recipe = {
      ...this.state.recipe,
      image: {
        url,
        upload: e.target.files[0]
      }
    };
    this.setState({ recipe });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleIngredientSubmit(e) {
    e.preventDefault();
    const ingredients = [
      ...this.state.recipe.ingredients,
      this.state.ingredientInput
    ];
    this.setState({
      recipe: { ...this.state.recipe, ingredients },
      ingredientInput: ""
    });
  }

  handleMethodSubmit(e) {
    e.preventDefault();
    const method = [...this.state.recipe.method, this.state.methodInput];
    this.setState({
      recipe: { ...this.state.recipe, method },
      methodInput: ""
    });
  }

  render() {
    if (!this.props.user.isAuthenticated) return <UserPrompt />;
    return (
      <div className="new-recipe">
        <header>
          <h1>Add New Recipe</h1>
        </header>
        <div className="recipe-form">
          <input
            placeholder="Boiled Potatoes"
            aria-label="recipe title"
            className="recipe-form__input"
            type="text"
            id="name"
            name="name"
            value={this.state.recipe.name}
            onChange={this.handleNameChange}
          />
          <input
            type="file"
            className="recipe-form__input"
            name="recipe-image"
            id="recipe-image"
            onChange={this.handleFileChange}
          />
          <form onSubmit={this.handleIngredientSubmit} action="">
            <input
              placeholder="potatoes"
              aria-label="ingredient"
              id="ingredient"
              name="ingredientInput"
              type="text"
              value={this.state.ingredientInput}
              onChange={this.handleChange}
            />
            <button className="btn">Add Ingredient</button>
          </form>

          <form action="" onSubmit={this.handleMethodSubmit}>
            <input
              placeholder="boil potatoes"
              aria-label="method"
              type="text"
              id="method"
              name="methodInput"
              value={this.state.methodInput}
              onChange={this.handleChange}
            />
            <button className="btn">Add Step</button>
          </form>

          <button className="btn" onClick={this.handleClick}>
            Save Recipe
          </button>
        </div>

        <Recipe recipe={this.state.recipe} />
      </div>
    );
  }
}

export default NewRecipe;
