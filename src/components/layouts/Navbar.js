import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Home from "../pages/Home";
import { logout } from "../../actions/authActions";

const Container = styled.nav`
  .nav-link {
    font-size: 17px;
  }
  .navbar transparent navbar-inverse {
    .navbar.transparent.navbar-inverse .navbar-inner {
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
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
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
        <nav style={{}} className="navbar transparent navbar-inverse">
          <div className="navbar-inner">
            {/* <ul className="navbar-nav "> */}
            {this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <ul>
                  <li>
                    <Link to="/Home" className="card-link">
                      <a style={{ color: "orange" }}>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/FarmManagement" className="card-link">
                      <a style={{ color: "orange" }}>List Bird</a>
                    </Link>
                  </li>

                  <li>
                    <Link to="/Gallery" className="card-link">
                      <a style={{ color: "orange" }}>Galery</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Report" className="card-link">
                      <a style={{ color: "orange" }}>Daily Log</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/LaporanKeuangan" className="card-link">
                      <a style={{ color: "orange" }}>Finance</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/Breeding" className="card-link">
                      <a style={{ color: "orange" }}>Breeding</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <i
                      style={{ color: "black", marginTop: 31 }}
                      className="fa fa-sign-out  "
                      onClick={() => this.onClickLogout()}
                    ></i>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* <li className="nav-item">
                   <button
                    className="btn"
                    style={{ backgroundColor: "transparent", color: "white" }}
                  >
                    <i
                      className="fa fa-sign-in  "
                      onClick={() => this.onClickLogout()}
                    ></i>
                  </button> 
                </li> */}
              </React.Fragment>
            )}
            {/* </ul> */}
          </div>
        </nav>
      </Container>
    );
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
