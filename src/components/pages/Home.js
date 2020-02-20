import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../utils/ServicesBurung";

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
const Container = styled.div`
  margin: 50px;
  .rounded-circle {
    margin: 50px;
  }
`;

export default class Home extends Component {
  state = {
    path: "http://localhost:5000/img/",
    data: []
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getAllBirds().then(bird => {
      console.log(bird);
      this.setState({
        data: bird.data.data,
        isLoading: false
      });
    });
  };
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    api.getAllBirds().then(bird => {
      this.setState({
        data: bird.data.data
      });
    });
  };
  render() {
    const { data } = this.state;
    const stat = ["Terjual", "Stok"];
    return (
      <Wrapper>
        <section className="jumbotron text-center">
          <div className="container">
            <h1
              className="jumbotron-heading"
              style={{ fontFamily: "Montserrat" }}
            >
              Farm
            </h1>
            <p className="lead text-muted" style={{ fontFamily: "Montserrat" }}>
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don't simply skip over it entirely.
            </p>

            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
            >
              Get Started
            </button>
            <div
              class="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div
                    id="carouselExampleCaptions"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <ol class="carousel-indicators">
                      <li
                        data-target="#carouselExampleCaptions"
                        data-slide-to="0"
                        class="active"
                      ></li>
                      <li
                        data-target="#carouselExampleCaptions"
                        data-slide-to="1"
                      ></li>
                      <li
                        data-target="#carouselExampleCaptions"
                        data-slide-to="2"
                      ></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          src="https://img.charteo.com/icons_03-001-01_076_xl.png"
                          class="d-block w-100"
                          alt="..."
                        />

                        <div class="carousel-caption d-none d-md-block">
                          {/* <h5 style={{ color: "grey" }}>First slide label</h5> */}

                          {/* <p style={{ color: "black", margin: 300 }}>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                          </p> */}
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img
                          src="https://img.charteo.com/icons_03-001-01_076_xl.png"
                          class="d-block w-100"
                          alt="..."
                        />

                        <div class="carousel-caption d-none d-md-block">
                          {/* <h5>Second slide label</h5> */}
                          {/* <p style={{ color: "black" }}>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                          </p> */}
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img
                          src="https://img.charteo.com/icons_03-001-01_076_xl.png"
                          class="d-block w-100"
                          alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block">
                          {/* <h5>Third slide label</h5> */}
                          {/* <p style={{ color: "black" }}>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                          </p> */}
                        </div>
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleCaptions"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleCaptions"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="row" style={{ justifyContent: "center" }}>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <Container>
                  <div className="text-center">
                    <img
                      className="rounded-circle"
                      src={this.state.path + dat.image1}
                      alt="Generic placeholder image"
                      width="140"
                      height="140"
                    ></img>
                    <h2 className="Title">
                      {dat.jenis} ({stat[dat.status]})
                    </h2>

                    <p>Berkualitas tinggi</p>
                    <p>{dat.umur} bulan</p>
                    <p>{dat.jenis_kelamin}</p>
                    <p>Suara Melengking</p>
                    <p>
                      <Link to={"/lihat?" + dat._id} className="card-link">
                        <button type="button" className="btn btn-warning">
                          See More
                        </button>
                      </Link>
                    </p>
                  </div>
                </Container>
              ))}
        </div>
      </Wrapper>
    );
  }
}
