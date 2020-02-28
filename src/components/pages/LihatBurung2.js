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
  .container {
    margin-top: 50px;
  }
`;

export default class LihatBurung extends Component {
  state = {
    path: "http://localhost:5000/img/",
    data: [],
    file: []
  };

  componentDidMount = async () => {
    var query = window.location.search.substring(1);
    await api.getBirdById(query).then(bird => {
      console.log(bird);
      this.setState({
        data: bird.data
      });
    });
    await api.getBirdReportById(query).then(bird => {
      console.log(bird);
      this.setState({
        file: bird.data.data
      });
    });
  };

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  searchReport({ target }) {
    // Declare variables
    var filter, table, tr, td, i, j, txtValue, temp;
    filter = target.value.toUpperCase();
    table = document.getElementById("listReports");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      var c = 0;
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        temp = td[j];
        if (temp) {
          txtValue = temp.textContent || temp.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            c = 1;
          }
        }
      }
      if (c > 0) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  render() {
    const { data } = this.state;
    const stat = ["Terjual", "Stok"];
    const { file } = this.state;
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
    var d = null;
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

          <div className="container">
            <h2 style={{ textAlign: "center", margin: 50 }}>
              Report Untuk Burung {data.name}
            </h2>
            <div className="input-group ">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari Log"
                  aria-label=""
                  id="search"
                  onChange={e => this.searchReport(e)}
                  aria-describedby="basic-addon2"
                ></input>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jam</th>
                  <th scope="col">Log</th>
                  <th scope="col">Pakan</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="listReports">
                {file.length <= 0
                  ? "NO DB ENTRIES YET"
                  : file.map(
                      fil => (
                        (d = new Date(fil.tanggal)),
                        (
                          <tr>
                            <th scope="row">{fil.nama}</th>
                            <td>
                              {d.getDate() +
                                " " +
                                months[d.getMonth()] +
                                " " +
                                d.getFullYear()}
                            </td>
                            <td>{fil.jam}</td>
                            <td>{fil.log}</td>
                            <td>{fil.pakan}</td>
                            <td>{fil.status}</td>
                          </tr>
                        )
                      )
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    );
  }
}
