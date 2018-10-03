import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RecipeBox from "./components/RecipeBox";
import "./styles/styles.scss";

ReactDOM.render(
  <BrowserRouter basename="/recipebox">
    <RecipeBox />
  </BrowserRouter>,
  document.getElementById("root")
);
