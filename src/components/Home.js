import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Home.scss";
import UserPrompt from "./UserPrompt";

const Home = ({ isAuthenticated }) => {
  let display;
  if (isAuthenticated) {
    display = (
      <div className="home-display">
        <p>View or add new recipes.</p>
        <div>
          <Link className="btn" to="/recipes">
            View Recipes
          </Link>
          <Link className="btn" to="/recipes/new">
            Add Recipe
          </Link>
        </div>
      </div>
    );
  } else {
    display = <UserPrompt />;
  }

  return <React.Fragment>{display}</React.Fragment>;
};

export default Home;
