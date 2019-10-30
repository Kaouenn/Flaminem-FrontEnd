import React from "react";
import axios from "axios";
import MainLayout from "./MainLayout";
import "../assets/login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render = () => {
    const { user, setUser } = this.props;
    return (
      <MainLayout user={user} setUser={setUser}>
        <form
          onSubmit={async event => {
            event.preventDefault();
            const response = await axios.post(
              "https://flaminem-backend.herokuapp.com/user/login",
              {
                username: this.state.username,
                password: this.state.password
              }
            );
            setUser(response.data);
          }}
        >
          <h2>Veuillez vous authentifier</h2>

          <input
            className="input-element"
            name="username"
            value={this.state.username}
            onChange={event => {
              this.setState({ username: event.target.value });
            }}
            placeholder="Utilisateur"
            type="text"
            required
          />

          <input
            className="input-element"
            name="password"
            value={this.state.password}
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
            placeholder="Password"
            type="password"
            required
          />

          <button className="button-form" type="submit">
            Valider
          </button>
        </form>
      </MainLayout>
    );
  };
}

export default Login;
