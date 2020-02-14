import React, { Component } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../utils/ServicesBurung";

const Container = styled.nav`
  max-width: 100%;
  margin: auto;

  .card-img {
    margin: 20px;
    margin-top: 80px;
  }
  .rounded-circle {
    margin-left: 70px;
    margin-top: 50px;
    object-fit: fill;
  }
  .card-title {
    text-align: left;
  }
  .card-text {
    text-align: left;
  }
  .img {
    width: 500px;
    height: 600px;
  }
  .item {
    width: 600px;

    min-height: 120px;
    max-height: auto;
    float: left;
    margin: 10px;
    padding: 20px;
  }
`;

export default class LihatBurung extends Component {
  state = {
    path: "http://localhost:5000/img/",
    data: []
  };

  componentDidMount = async () => {
    var query = window.location.search.substring(1);
    await api.getBirdById(query).then(bird => {
      console.log(bird);
      this.setState({
        data: bird.data
      });
    });
  };
  render() {
    const { data } = this.state;
    const stat = ["Terjual", "Stok"];
    return (
      <Container>
        <div classNameName="wrapper">
          <div className="card mb-10">
            <div className="row no-gutters">
              <div style={{ marginLeft: 60 }} className="col-md-5">
                <div className="item">
                  <Carousel showStatus={false} showThumbs={false} width="400px">
                    <div>
                      <img src={this.state.path + data.image1} />
                    </div>
                    <div>
                      <img src={this.state.path + data.image2} />
                    </div>
                    <div>
                      <img src={this.state.path + data.image3} />
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card-body">
                  <h1 className="card-title">
                    {data.name} {stat[data.status]}
                  </h1>

                  <hr></hr>
                  <p className="card-text">{data.deskripsi}</p>
                  <p>Jenis :{data.jenis}</p>
                  <hr></hr>
                  <p>Umur : {data.umur}</p>
                  <hr></hr>
                  <p>Warna : {data.warna}</p>
                  <hr></hr>
                  <p>Jenis kelamin : {data.jenis_kelamin}</p>
                  <hr></hr>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
