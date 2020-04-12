import React, { Component } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from "../utils/ServicesFinance";

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
    data: [],
    bird: []
  };

  componentDidMount = async () => {
    var query = window.location.search.substring(1);
    await api.getReportsById(query).then(report => {
      this.setState({
        data: report.data.data
      });
    });
  };
  render() {
    const { data } = this.state;
    const stat = ["Pengeluaran", "Pemasukkan"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var d = new Date(data.tanggal);
    return (
      <Container>
        <div classNameName="wrapper">
          <div className="card mb-10">
            <div className="col-md-5">
              <div className="card-body">
                <h1 className="card-title">{stat[data.status]}</h1>

                <hr></hr>
                <p className="card-text">
                  {data.name}{" "}
                  {d.getDate() +
                    " " +
                    months[d.getMonth()] +
                    " " +
                    d.getFullYear()}
                </p>
                <p>Pembeli : {data.pembeli}</p>
                <p>Keterangan : {data.keterangan}</p>
                <hr></hr>
                <p>
                  Nominal : {data.in}
                  {data.out}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
