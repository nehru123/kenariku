import React, { Component } from "react";

import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Container = styled.nav`
  margin-bottom: 100px;
  box-sizing: border-box;
  margin: 0;

  .jumbotron {
    background-size: cover;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }
  img {
    width: 100%;
  }
  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .col-md-4 {
      -ms-flex: 50%;
      flex: 50%;
      max-width: 50%;
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .col-md-4 {
      -ms-flex: 100%;
      flex: 100%;
      max-width: 100%;
    }
  }
  .videoCover {
    box-shadow: 5px 0px 18px #888888;
    border-radius: 100px;
    border-radius: 15px;
    size: 100vh;
    width: 800px;
    height: 360px;
    background-color: grey;
    margin: auto;
  }
`;

export default class Koleksi extends Component {
  state = {
    files: []
  };

  fileSelectedHandler = e => {
    this.setState({ files: [...this.state.files, ...e.target.files] });
  };
  render() {
    return (
      <Container>
        <section class="jumbotron text-center">
          <div class="container">
            <h1>Kenari Gunung</h1>
            <p class="lead text-muted">
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don’t simply skip over it entirely.
            </p>
            <button
              type="button"
              className="btn btn-success"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
            >
              Tambah Gallery
            </button>

            <div
              className="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content" closeModal={this.closeModal}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Gallery Burung
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div
                        style={{ justifyContent: "center" }}
                        className="form-row"
                      >
                        <div className="form-group col-md-3">
                          <label for="inputCity">Gambar Burung</label>
                          <input type="file" id="foto" />
                          <span>
                            <button
                              type="button"
                              name="foto"
                              class="btn btn-primary"
                              onClick={e => this.uploadImage(e)}
                            >
                              Upload
                            </button>
                          </span>
                        </div>
                        <div className="form-group col-md-3">
                          <label for="inputCity">Video Burung</label>
                          <input type="file" id="foto" />
                          <span>
                            <button
                              type="button"
                              name="foto"
                              class="btn btn-primary"
                              onClick={e => this.uploadImage(e)}
                            >
                              Upload
                            </button>
                          </span>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          data-dismiss="modal"
                          className="btn btn-success"
                          onClick={e => this.add(e)}
                        >
                          Tambahkan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h3 style={{ margin: 30 }}>Album </h3>

        <div style={{ margin: 20 }} class="row">
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(117).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(131).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(98).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
        </div>

        <h3 style={{ margin: 30 }}>Event </h3>

        <div style={{ margin: 20 }} class="row">
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(117).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(131).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
          <figure class="col-md-4">
            <a
              href="https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg"
              data-size="1600x1067"
            >
              <img
                alt="picture"
                src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(98).jpg"
                class="img-fluid"
              />
            </a>
          </figure>
        </div>
      </Container>
    );
  }
}
