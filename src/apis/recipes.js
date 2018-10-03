import API_URL from "./base";

export function getRecipes() {
  return fetch(`${API_URL}/api/recipes`)
    .then(response => {
      if (!response.ok) throw new Error("connection issue");
      return response.json();
    })
    .catch(error => error);
}

// shouldn't need to use
export function getRecipe(id) {
  return fetch(`${API_URL}/api/recipes/${id}`)
    .then(response => {
      if (!response.ok) throw new Error("connection issue");
      return response.json();
    })
    .catch(error => error);
}

export function postRecipe(recipe) {
  return fetch(`${API_URL}/api/recipes/new`, {
    method: "POST",
    body: recipe
  })
    .then(response => {
      if (!response.ok) throw new Error("connection issue");
      return response.json();
    })
    .catch(error => error);
}

export function putRecipe(recipe) {
  return fetch(`${API_URL}/api/recipes/edit/${recipe._id}`, {
    method: "PUT",
    body: JSON.stringify(recipe),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("connection issue");
      return res.json();
    })
    .catch(err => err);
}

export function deleteRecipe(recipe) {
  return fetch(`${API_URL}/api/recipes/${recipe._id}`, {
    method: "DELETE",
    body: JSON.stringify(recipe),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("connection issue");
      return res.json();
    })
    .catch(err => err);
}
