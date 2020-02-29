import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: 5px 0px 18px #888888;
  border-radius: 100px;
  border-radius: 15px;
  .img {
    opacity: 1;

    height: auto;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }
`;

export default class GaleryCards extends Component {
  render(props) {
    return (
      <Container>
        <div class="card mb-4 shadow-sm">
          <Link to="/Koleksi">
            <img
              class="bd-placeholder-img card-img-top"
              src={this.props.picture}
              width="100%"
              height="225"
            ></img>
          </Link>
          <div class="card-body">
            <p class="card-text">{this.props.desc}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Listen
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  Pause
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
