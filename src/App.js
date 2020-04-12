import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

// Components
import PrivateRoute from "./Common/PrivateRoute";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/layouts/Footer";
import Detail from "./components/pages/Detail";
import FarmManagement from "./components/pages/FarmManagement";
import Gallery from "./components/pages/Gallery";
import DetailTrans from "./components/pages/DetailTrans";
import LihatBurung from "./components/pages/LihatBurung";
import LihatBurung2 from "./components/pages/LihatBurung2";
import Report from "./components/pages/Report";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Jadwal from "./components/pages/Jadwal";
import Koleksi from "./components/pages/Koleksi";
import LaporanKeuangan from "./components/pages/LaporanKeuangan";
import DetailKeuangan from "./components/pages/DetailKeuangan";
import Breeding from "./components/pages/Breeding";
import DetailLog from "./components/pages/DetailLog";
import DetailParent from "./components/pages/DetailParent";

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
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/Home" component={Home} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/detail" component={Detail} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/Farmmanagement"
                component={FarmManagement}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/lihat" component={LihatBurung} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/lihatRep" component={LihatBurung2} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/Report" component={Report} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/LaporanKeuangan"
                component={LaporanKeuangan}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/Gallery" component={Gallery} />
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/Jadwal" component={Jadwal} />
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/Koleksi" component={Koleksi} />
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/DetailKeuangan"
                component={DetailKeuangan}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/Breeding" component={Breeding} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/DetailLog" component={DetailLog} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/DetailParent"
                component={DetailParent}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/lihatTrans" component={DetailTrans} />
            </Switch>
          </Router>
        </Provider>
      </MyApp>
    );
  }
}

export default App;
