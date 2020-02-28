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
    display: -ms-flexbox; /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap; /* IE10 */
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create four equal columns that sits next to each other */
  .column {
    -ms-flex: 25%; /* IE10 */
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
  }

  .column img {
    margin-top: 8px;
    vertical-align: middle;
    width: 100%;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .column {
      -ms-flex: 50%;
      flex: 50%;
      max-width: 50%;
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .column {
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
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <input
                            type="file"
                            multiple
                            onChange={this.fileSelectedHandler}
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <input
                            type="file"
                            multiple
                            onChange={this.fileSelectedHandler}
                          />
                        </div>

                        <div className="form-group col-md-12">
                          <input
                            type="file"
                            multiple
                            onChange={this.fileSelectedHandler}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 style={{ textAlign: "center", margin: 30 }}>Videos</h3>
          <div className="videoCover"></div>
        </section>

        <div style={{ margin: 50, textAlign: "center" }} id="myBtnContainer">
          <button class="btn active" onclick="filterSelection('all')">
            Show all
          </button>
          <button class="btn" onclick="filterSelection('album')">
            {" "}
            Album
          </button>
          <button class="btn" onclick="filterSelection('event')">
            {" "}
            Event
          </button>

          <button class="btn" onclick="filterSelection('videos')">
            {" "}
            Videos
          </button>
        </div>
        <div
          class="row"
          style={{ margin: "auto", width: "100%", justifyContent: "center" }}
        >
          <div class="column">
            <img
              src="https://www.nhm.ac.uk/content/dam/nhmwww/discover/common-tailorbirds/Common-tailorbird-full-width.jpg.thumb.1920.1920.png"
              style={{ width: "100%" }}
            />
            <img
              src="https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/common_tailorbird_bocos.jpg?itok=xM5iOtMR"
              style={{ width: "100%" }}
            />
            <img
              src="https://www.imperial.ac.uk/ImageCropToolT4/imageTool/uploaded-images/newseventsimage_1557320321101_mainnews2012_x1.jpg"
              style={{ width: "100%" }}
            />
          </div>
          <div class="column">
            <img
              src="https://scx1.b-cdn.net/csz/news/800/2019/mostnativebi.jpg"
              style={{ width: "100%" }}
            />

            <img
              src="https://ontariospca.ca/wp-content/uploads/2019/03/Living-with-wildlife-birds-544x600.jpg"
              style={{ width: "100%" }}
            />
          </div>
          <div class="column">
            <img
              src="https://media.phillyvoice.com/media/images/bird-in-spinach.2e16d0ba.fill-735x490.jpg"
              style={{ width: "100%" }}
            />
            <img
              src="https://www.nhm.ac.uk/content/dam/nhmwww/discover/common-tailorbirds/Common-tailorbird-full-width.jpg.thumb.1920.1920.png"
              style={{ width: "100%" }}
            />
            <img
              src="https://img.jakpost.net/c/2019/12/20/2019_12_20_83809_1576815251._large.jpg"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Container>
    );
  }
}
