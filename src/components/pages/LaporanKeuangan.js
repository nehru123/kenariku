import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/ServicesFinance";

const Container = styled.nav`
  .jumbotron {
    background-image: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-financial-management-banner-background-design-image_188731.jpg");
    background-size: cover;
  }
  .table {
    border-radius: 5px;
    width: 100%;
    margin: 0px auto;
    float: none;
  }
  .action {
    text-align: end;
  }
`;
export default class LaporanKeuangan extends Component {
  state = {
    tanggal: "",
    idBird: "",
    pembeli: "",
    harga: "",
    data: [],
    file: [],
    idUp: "",
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getAllReports().then(report => {
      console.log(report);
      this.setState({
        file: report.data.data,
        isLoading: false
      });
    });
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

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  getDataFromDb = () => {
    api.getAllBirds().then(bird => {
      this.setState({
        data: bird.data.data
      });
    });
  };

  getReportFromDb = () => {
    api.getAllReports().then(report => {
      this.setState({
        file: report.data.data
      });
    });
  };

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
  print = async e => {
    var divToPrint = document.getElementById("listJournal");
    var newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  };

  addReport = async e => {
    e.preventDefault();
    const payload = {
      tanggal: this.state.tanggal,
      idBird: this.state.idBird,
      pembeli: this.state.pembeli,
      harga: this.state.harga
    };

    await api.insertFinance(payload).then(res => {
      window.alert(`Report inserted successfully`);
      this.getReportFromDb();
    });

    await api.updateBirdById(this.state.idBird).then(res => {
      window.alert(`Bird updated successfully`);
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };
  render() {
    const { data } = this.state;
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
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Laporan Keuangan</h1>
            <p className="lead">
              Laporan digunakan untuk melihat dan laporan burung kenari.
            </p>
            <button
              type="button"
              className="btn btn-success"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
            >
              Tambah Transaksi
            </button>
            <span>
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => this.print(e)}
              >
                Download Jurnal
              </button>
            </span>
            <div
              className="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Tambah Log
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
                        <div className="form-group col-md-4">
                          <label for="inputType">Tanggal</label>
                          <input
                            type="date"
                            className="form-control"
                            name="tanggal"
                            onChange={e => this.onChange(e)}
                            value={this.state.tanggal}
                          ></input>
                        </div>
                        <div className="form-group col-md-4">
                          <label for="inputName">Burung</label>
                          <select
                            type="text"
                            name="idBird"
                            className="form-control"
                            id="inputState"
                            onChange={e => this.onChange(e)}
                            value={this.state.idBird}
                          >
                            <option selected>Choose</option>
                            {data.length <= 0
                              ? "NO DB ENTRIES YET"
                              : data.map(dat => (
                                  <option value={dat._id}>{dat.name}</option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label for="inputCity">Pembeli</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            name="pembeli"
                            onChange={e => this.onChange(e)}
                            value={this.state.pembeli}
                          ></input>
                        </div>
                        <div className="form-group col-md-4">
                          <label for="inputCity">Harga</label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputCity"
                            name="harga"
                            onChange={e => this.onChange(e)}
                            value={this.state.harga}
                          ></input>
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
                          type="button"
                          className="btn btn-success"
                          onClick={e => this.addReport(e)}
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
        </div>
        <div className="container">
          <div className="form-row" style={{ justifyContent: "space-between" }}>
            <div className="form-group col-md-4">
              <label for="inputState">Laporan Penjualan Perbulan</label>
              <select
                type="text"
                name="Laporan"
                className="form-control"
                id="inputState"
                value=""
                onChange={e => this.onChange(e)}
              >
                <option selected>Plilih Bulan</option>
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
                <option value="Maret">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
              </select>
              <button type="button" className="btn btn-success">
                Hitung Total Penjualan
              </button>
            </div>
            <div className="form-group col-md-4">
              <h5 style={{}}>Total Penjualan Bulan Maret Adalah</h5>
              <h5 style={{ fontWeight: "bold" }}>Rp.35.000.000,00</h5>
            </div>
          </div>
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Cari..."
              aria-label=""
              aria-describedby="basic-addon2"
              id="search"
              onChange={e => this.searchReport(e)}
            ></input>
            <div className="input-group-append"></div>
          </div>
          <table class="table" id="listJournal">
            <thead>
              <tr>
                <th scope="col">Tanggal</th>
                <th scope="col">Customer</th>
                <th scope="col">ID</th>
                <th scope="col">Harga</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {file.length <= 0
                ? "NO DB ENTRIES YET"
                : file.map(
                    fil => (
                      (d = new Date(fil.tanggal)),
                      (
                        <tr>
                          <td>
                            {d.getDate() +
                              " " +
                              months[d.getMonth()] +
                              " " +
                              d.getFullYear()}
                          </td>
                          <td>{fil.pembeli}</td>
                          <td>{fil.idBird}</td>
                          <td>{fil.harga}</td>
                        </tr>
                      )
                    )
                  )}
            </tbody>
          </table>
        </div>
      </Container>
    );
  }
}
