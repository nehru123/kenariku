import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// import { loginuser } from "../utils/Services";
import { loginuser } from "../../actions/authActions";

import styled from "styled-components";

const mapStateToProps = state => ({
  auth: state.auth
});

const Container = styled.nav`
  min-height: 100vh;
  overflow-y: hidden;
  .title {
    margin-top: 100px;
    text-align: center;
    background-color: #007bff;
    padding: 10px;

    color: white;

    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  .cover {
    padding: 1rem 2rem;
    height: 330px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .bigCover {
    margin: auto;
    width: 35%;
    box-shadow: 5px 0px 18px #888888;
    size: 1000vh;
    border-radius: 15px;
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit(e) {
    alert("Login Berhasil");
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
      this.props.history.push("/home");
    }
  }

  // handle if user logged in yet try to direct to auth pages
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <Container>
        <div className="bigCover">
          <div className="title">
            <h4>Login</h4>
          </div>
          <div className="cover">
            <form onSubmit={e => this.onSubmit(e)}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={e => this.onChange(e)}
                  value={this.state.email}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={e => this.onChange(e)}
                  value={this.state.password}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ width: "100%" }}
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
        </div>
      </Container>
    );
  }
}

export default connect(mapStateToProps, { loginuser })(withRouter(Login));
