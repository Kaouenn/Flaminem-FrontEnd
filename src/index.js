import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import GetData from "./components/GetData";
import Cookies from "js-cookie";
import "./assets/index.css";

class App extends React.Component {
  state = {
    user: Cookies.get("userProfile")
      ? JSON.parse(Cookies.get("userProfile"))
      : null
  };

  setUser = user => {
    Cookies.set("userProfile", JSON.stringify(user));
    this.setState({ user });
  };

  render = () => {
    const pageCommonProps = {
      user: this.state.user,
      setUser: this.setUser
    };
    return (
      <div className="App">
        <Header />
        {this.state.user === null ? (
          <Login {...pageCommonProps} />
        ) : (
          <GetData {...pageCommonProps} />
        )}
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
