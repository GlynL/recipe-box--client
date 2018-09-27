import React, { Component } from "react";
import "../styles/components/Register.scss";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const type = this.props.type.toLowerCase();
    if (type === "register") {
      this.props.authUser(this.state, "register");
    }
    if (type === "login") {
      this.props.authUser(this.state, "login");
    }
    this.setState({
      username: "",
      password: ""
    });
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  render() {
    return (
      <div className="register">
        <h1>{this.props.type}</h1>
        <form className="register-form" onSubmit={this.handleSubmit}>
          <div>
            <div className="register-form__item">
              <label className="register-form__label" htmlFor="username">
                Username
              </label>
              <input
                className="input"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label className="register-form__label--extra" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
