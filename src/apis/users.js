const API_URL = "/api/users";

export function loginUser(user) {
  return fetch(`/api/users/login`, {
    method: "post",
    body: JSON.stringify(user),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(data => data.json())
    .then(json => {
      localStorage.setItem("jwtToken", json.token);
      return json;
    })
    .catch(err => {
      console.log(err);
    });
}

export async function registerUser(user) {
  return fetch(`/api/users/new`, {
    method: "post",
    body: JSON.stringify(user),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(data => {
      localStorage.setItem("jwtToken", data.token);
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
}
