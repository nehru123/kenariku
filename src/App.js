import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

// Components
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/layouts/Footer";
import Detail from "./components/pages/Detail";
import FarmManagement from "./components/pages/FarmManagement";
import Galery from "./components/pages/Galery";
import LihatBurung from "./components/pages/LihatBurung";
import Report from "./components/pages/Report";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Berita from "./components/pages/Berita";
import LaporanKeuangan from "./components/pages/LaporanKeuangan";

// utils
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentUser, logout } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

const MyApp = styled.div`
  overflow-x: hidden;
`;

if (localStorage.jwtToken) {
  // set token to authorization
  setAuthToken(localStorage.jwtToken);

  // get user data and decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logout());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
      <MyApp>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/detail" component={Detail} />
              <Route exact path="/farmmanagement" component={FarmManagement} />
              <Route exact path="/Galery" component={Galery} />
              <Route exact path="/lihat" component={LihatBurung} />
              <Route exact path="/Report" component={Report} />
              <Route exact path="/Berita" component={Berita} />

              <Route exact path="/Register" component={Register} />
              <Route
                exact
                path="/LaporanKeuangan"
                component={LaporanKeuangan}
              />
            </Switch>
          </Router>
        </Provider>
      </MyApp>
    );
  }
}

export default App;
