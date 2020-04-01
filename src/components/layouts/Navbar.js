import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import { logout } from "../../actions/authActions";

const Container = styled.nav`
  /* .navbar navbar-expand-sm bg-primary navbar-dark {
    box-shadow: 5px 0px 18px #888888;

    border-radius: 15px;
  
  } */

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    float: left;
  }
  .navbar-inner {
    display: inline;
  }
  li a {
    color: orange;
  }

  .navbar.transparent.navbar-inverse .navbar-inner {
    display: inline;
    border-width: 0px;
    -webkit-box-shadow: 0px 0px;
    box-shadow: 0px 0px;
    background-color: rgba(0, 0, 0, 0);
    background-image: -webkit-gradient(
      linear,
      50% 0%,
      50% 100%,
      color-stop(0%, rgba(0, 0, 0, 0)),
      color-stop(100%, rgba(0, 0, 0, 0))
    );
    background-image: -webkit-linear-gradient(
      270deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const mapStateToProps = state => ({
  auth: state.auth
});

class Navbar extends React.Component {
  state = {
    name: ""
  };

  componentDidMount() {
    console.log("====================================");
    console.log("Props", this.props);
    console.log("====================================");
  }

  componentWillUpdate(prevprops) {
    console.log("====================================");
    console.log("Prevprops", prevprops);
    console.log("====================================");
    console.log("====================================");
    console.log("Props", this.props);
    console.log("====================================");
    if (prevprops.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      this.setState({
        name: prevprops.auth.user.name
      });
    }
  }

  onClickLogout() {
    this.props.logout();
    window.location.replace("/");
  }

  render() {
    return (
      <Container>
        <nav className="navbar transparent navbar-inverse">
          <div className="navbar-inner">
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link className="navbar-brand" to="/">
                <img
                  src="https://lh3.googleusercontent.com/-G4dTDlDvbMc/WLv2jGYHvNI/AAAAAAAAAGk/-zzM2Ysv2FI/s640/67.png"
                  width="50px"
                ></img>
              </Link> */}
            <ul>
              {this.props.auth.isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/Home" className="card-link">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/FarmManagement" className="card-link">
                      <a className="nav-link">List Bird</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Gallery" className="card-link">
                      <a className="nav-link">Galery</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Report" className="card-link">
                      <a className="nav-link">Daily Log</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/LaporanKeuangan" className="card-link">
                      <a className="nav-link">Finance</a>
                    </Link>
                  </li>

                  {/* <li className="nav-item">
                  <Link to="/Jadwal" className="card-link">
                    <a className="nav-link">Jadwal</a>
                  </Link>
                </li> */}
                  <li className="nav-item">
                    <Link to="/Breeding" className="card-link">
                      <a className="nav-link">Breeding</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "transparent",
                        color: "white"
                      }}
                    >
                      <i
                        className="fa fa-sign-out  "
                        onClick={() => this.onClickLogout()}
                      ></i>
                    </button>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    {/* <button
                    className="btn"
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <i
                      className="fa fa-sign-in  "
                      onClick={() => this.onClickLogout()}
                    ></i>
                  </button> */}
                  </li>
                </React.Fragment>
              )}
            </ul>
            {/* </div> */}
          </div>
        </nav>
      </Container>
    );
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
