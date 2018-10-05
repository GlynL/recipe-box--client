import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Banner from "./Banner";
import NewRecipe from "./NewRecipe";
import AllRecipes from "./AllRecipes";
import Recipe from "./Recipe";
import EditRecipe from "./EditRecipe";
import Register from "./Register";
import Home from "./Home";
import * as api from "../apis/recipes";
import * as userApi from "../apis/users";

class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: {
        isAuthenticated: false,
        info: {}
      }
    };

    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  async addRecipe(recipe) {
    let formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("recipe-image", recipe.image.upload);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("method", JSON.stringify(recipe.method));
    formData.append("author", this.state.user.info.id);
    const newRecipe = await api.postRecipe(formData);
    const recipes = [...this.state.recipes, newRecipe];
    this.setState({ recipes });
  }

  async editRecipe(recipe) {
    const editedRecipe = await api.putRecipe(recipe);
    const recipes = this.state.recipes.map(
      item => (item._id === editedRecipe._id ? editedRecipe : item)
    );
    this.setState({ recipes });
    return editedRecipe;
  }

  async removeRecipe(recipe) {
    await api.deleteRecipe(recipe);
    const recipes = this.state.recipes.filter(item => item._id !== recipe._id);
    this.setState({ recipes });
  }

  async componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      const token = localStorage.getItem("jwtToken");
      const info = jwtDecode(token);
      this.setState({
        user: {
          isAuthenticated: true,
          info
        }
      });
    }
    const recipes = await api.getRecipes();
    this.setState({ recipes });
  }

  async authUser(user, type) {
    try {
      let authedUser;
      if (type === "login") {
        authedUser = await userApi.loginUser(user);
      }
      if (type === "register") {
        authedUser = await userApi.registerUser(user);
      }
      if (type === "logout") {
        localStorage.clear();
        this.setState({ user: { isAuthenticated: false, info: {} } });
        this.props.history.push("/");
        return;
      }
      const updatedUser = { isAuthenticated: true, info: authedUser };
      this.setState({ user: updatedUser });
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Banner
          isAuthenticated={this.state.user.isAuthenticated}
          authUser={this.authUser}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                isAuthenticated={this.state.user.isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/recipes"
            render={props => (
              <AllRecipes {...props} recipes={this.state.recipes} />
            )}
          />
          <Route
            path="/recipes/new"
            render={props => (
              <NewRecipe
                {...props}
                addRecipe={this.addRecipe}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/recipes/:id"
            render={props => (
              <Recipe
                {...props}
                recipes={this.state.recipes}
                removeRecipe={this.removeRecipe}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/recipes/edit/:id"
            render={props => (
              <EditRecipe
                {...props}
                recipes={this.state.recipes}
                editRecipe={this.editRecipe}
              />
            )}
          />
          <Route
            path="/users/register"
            render={props => (
              <Register {...props} type={"Register"} authUser={this.authUser} />
            )}
          />
          <Route
            path="/users/login"
            render={props => (
              <Register {...props} type={"Login"} authUser={this.authUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(RecipeBox);
