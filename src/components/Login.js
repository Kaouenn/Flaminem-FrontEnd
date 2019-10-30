import React from "react";
import axios from "axios";
import MainLayout from "./MainLayout";
import "../assets/login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    requestSent: null,
    error: null
  };

  render = () => {
    const { user, setUser } = this.props;
    return (
      <MainLayout user={user} setUser={setUser}>
        <form
          onSubmit={async event => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://flaminem-backend.herokuapp.com/user/login",
                {
                  username: this.state.username,
                  password: this.state.password
                }
              );
              await setUser(response.data);
              this.setState({ requestSent: true });
            } catch (error) {
              console.log(error.message);
              this.setState({ error: error });
            }
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
          {this.state.error !== null ? (
            <div className="error">
              <h2>
                Veuillez entrer correctement
                <br />
                <span>Username & Password</span>
              </h2>
              <button
                className="button-error"
                type="submit"
                onClick={() => {
                  this.componentDidMount();
                }}
              >
                OK
              </button>
            </div>
          ) : null}
        </form>
      </MainLayout>
    );
  };
  componentDidMount = () => {
    this.setState({ error: null });
  };
}

export default Login;
