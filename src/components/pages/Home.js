import React, { Component } from "react";
import Cards from "../layouts/Cards";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 100%;
  size: 100vh;
  .display {
    text-align: left;
    font-family: "Montserrat";
  }
  .slogan {
    text-align: left;
    font-family: "Montserrat";
  }
  .jumbotron {
    height: 400px;
    background-image: url("https://cdn.pixabay.com/photo/2017/01/31/07/06/banner-2023093__340.jpg");
    display: flex;
    justify-content: center;
    background-size: cover;
  }
  .container {
    margin-top: 50px;
  }
  .jumbotron-heading {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default class Home extends Component {
  render() {
    return (
      <Wrapper>
        <section className="jumbotron text-center">
          <div className="container">
            <h1
              className="jumbotron-heading"
              style={{ fontFamily: "Montserrat" }}
            >
              Purnama Farm
            </h1>
            <p className="lead text-muted" style={{ fontFamily: "Montserrat" }}>
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don't simply skip over it entirely.
            </p>

            <button type="button" class="btn btn-primary">
              Get Started
            </button>

            <div
              class="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content"></div>
              </div>
            </div>
          </div>
        </section>

        <div class="row">
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
          <div class="col-lg-4">
            <Cards></Cards>
          </div>
        </div>
      </Wrapper>
    );
  }
}
