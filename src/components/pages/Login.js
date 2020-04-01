import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
// import { loginuser } from "../utils/Services";
import { loginuser } from "../../actions/authActions";

import styled from "styled-components";

const mapStateToProps = state => ({
  auth: state.auth
});

const Container = styled.nav`
  min-height: 100vh;
  overflow-y: hidden;

  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #faca09;

  .Kotak {
    margin: auto;
    margin-top: 150px;
    width: 368px;
    height: 420px;
    border-radius: 40px;
    box-shadow: 8px 15px 25px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
  }
  .KotakSatu {
  }
  .KotakDua {
  }
  .Wrapper {
    margin: 40px;
    padding-top: 100px;
  }
  .btn-login {
    border-radius: 12px;
    box-shadow: 5px 10px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #feb200;
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
        <div className="Kotak">
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="Wrapper">
              <div className="KotakSatu">
                <div class="form-group">
                  {/* <label for="exampleInputEmail1">Email address</label> */}
                  <input
                    style={{
                      backgroundColor: "#f2eded",
                      borderWidth: 0,
                      border: "none",
                      borderRadius: 15,
                      height: 45,
                      fontSize: 13
                    }}
                    type="email"
                    name="email"
                    placeholder="  email address"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={e => this.onChange(e)}
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="KotakDua">
                <div class="form-group">
                  {/* <label for="exampleInputPassword1">Password</label> */}
                  <input
                    style={{
                      backgroundColor: "#f2eded",
                      borderWidth: 0,
                      border: "none",
                      borderRadius: 15,
                      height: 45,
                      fontSize: 13
                    }}
                    type="password"
                    placeholder="  password"
                    name="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={e => this.onChange(e)}
                    value={this.state.password}
                  />
                </div>
              </div>
            </div>
            <button
              style={{}}
              type="submit"
              class="btn-login"
              style={{
                textAlign: "center",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: 110,
                height: 35,
                borderWidth: 0,
                border: "none"
              }}
            >
              Login
            </button>
            <p style={{ textAlign: "center", marginTop: 50 }}>
              Belum Daftar ?{" "}
              <span>
                <Link to="/Register" className="card-link">
                  <a className="GoesTo">Daftar Disini</a>
                </Link>
              </span>
            </p>
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
