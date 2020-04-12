import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { PropTypes, node } from "prop-types";
// import { loginuser } from "../utils/Services";
import { loginuser } from "../../actions/authActions";
import assets from "../assets/Foto.png";

import styled from "styled-components";

const mapStateToProps = state => ({
  auth: state.auth
});

const Container = styled.nav`
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #faca09;

  .Kotak {
    margin: auto;
    margin-top: 60px;
    border-radius: 40px;
    box-shadow: 8px 15px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    width: 368px;
    height: 420px;
  }
  .Wrapper {
    margin: 30px;
    padding-top: 100px;
  }
  .ButtonLogin {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .btn {
    border-radius: 15px;
    box-shadow: 5px 10px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #feb200;
  }
  .fa-lock {
  }
  .fa-evelope {
    position: relative;
    left: 23px;
    bottom: -36px;
  }
`;
class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginuser(userData, this.props.history);
  }

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  // logged in and error handling
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  // handle if user logged in yet try to direct to auth pages
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  render() {
    return (
      <Container>
        <img
          style={{ position: "relative", left: 605, bottom: -156 }}
          src="Foto.png"
          width="150px"
          height="100px"
        ></img>
        <div className="Kotak">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="Wrapper">
              <div class="form-group">
                {/* <label for="exampleInputEmail1">Email address</label> */}
                <i
                  style={{ position: "relative", left: 27, bottom: -37 }}
                  className="fa fa-envelope"
                  aria-hidden="true"
                ></i>
                <input
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#f2eded",
                    fontSize: 13,
                    padding: 13,
                    borderWidth: 0,
                    paddingInlineStart: 50
                  }}
                  type="email"
                  name="email"
                  placeholder="email address"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={e => this.onChange(e)}
                  value={this.state.email}
                />
              </div>

              <div class="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <i
                  style={{ position: "relative", left: 27, bottom: -37 }}
                  className="fa fa-key"
                  aria-hidden="true"
                ></i>

                <input
                  style={{
                    borderRadius: 15,
                    backgroundColor: "#f2eded",
                    fontSize: 13,
                    padding: 13,
                    borderWidth: 0,
                    paddingInlineStart: 60
                  }}
                  type="password"
                  placeholder="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={e => this.onChange(e)}
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="ButtonLogin">
              <button
                style={{
                  // backgroundColor: "#feb200",
                  width: 110,
                  height: 35,
                  fontSize: 13,
                  color: "white"
                }}
                type="submit"
                className="btn btn-login "
              >
                Login
              </button>
            </div>
            <p style={{ textAlign: "center", marginTop: 50 }}>
              Belum Daftar ?{" "}
              <span>
                <Link to="/Register" className="card-link">
                  <a className="GoesTo">Daftar Disini</a>
                </Link>
              </span>
            </p>{" "}
          </form>
        </div>
      </Container>
    );
  }
}
Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { loginuser })(withRouter(Login));
