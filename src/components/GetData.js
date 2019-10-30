import React from "react";
import axios from "axios";
import ClientsLoader from "./ClientsLoader";
import MainLayout from "./MainLayout";

import "../assets/getData.css";

class GetData extends React.Component {
  state = {
    dataClients: [],
    clientAdrress: null,
    isLoading: true
  };

  renderClientAddress = () => {};
  rederClients = () => {
    if (this.state.isLoading === true) {
      return <ClientsLoader />;
    } else {
      return this.state.dataClients.map(client => {
        return (
          <li
            key={client._id}
            className={
              "client " +
              (this.state.clientAdrress === client.address
                ? "client-selected"
                : "")
            }
            onClick={async () => {
              this.setState({ clientAdrress: client.address });
            }}
          >
            <h3 className="name">
              <span>Nom :</span> {client.lastName}
            </h3>
            <h3 className="lastName">
              <span>Prénom :</span> {client.name}
            </h3>
          </li>
        );
      });
    }
  };

  render = () => {
    const { user, setUser } = this.props;
    return (
      <MainLayout user={user} setUser={setUser}>
        <div className="getdata">
          <h2>
            Liste de clients
            <span role="img" aria-label="0">
              🗄
            </span>
          </h2>
          <ul className="clients-list">{this.rederClients()}</ul>
          <div
            className={
              "render-address " +
              (this.state.clientAdrress !== null ? "address-selected" : "")
            }
          >
            {this.state.clientAdrress !== null ? (
              <div>
                <h2>Détails client:</h2>
                <p>
                  <b>
                    Adresse
                    <span role="img" aria-label="1">
                      🏠
                    </span>
                    :
                  </b>
                  {this.state.clientAdrress}
                </p>
              </div>
            ) : null}
          </div>

          <button
            className="log-out"
            onClick={() => {
              this.props.setUser(null);
            }}
          >
            Me déconnecter
          </button>
        </div>
      </MainLayout>
    );
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "https://flaminem-backend.herokuapp.com/client"
    );
    this.setState({
      dataClients: response.data,
      isLoading: false
    });
    window.scrollTo(0, 0);
  };
}

export default GetData;
