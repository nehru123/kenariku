import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/ServicesFinance";

const Container = styled.nav`
  .jumbotron {
    /* background-image: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-financial-management-banner-background-design-image_188731.jpg"); */
    background-image: url("https://static.vecteezy.com/system/resources/thumbnails/000/457/342/original/Finance_Flat_Design_In_Blue._Business_and_Finance_Illustration_in_Doodle_Style._Increasing_Income_and_Money_Management.jpg");
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
    tahun: "",
    pembeli: "",
    filter: "",
    nominal: "",
    keterangan: "",
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
    var filter,
      tahun,
      table,
      tr,
      td,
      i,
      j,
      txtValue,
      temp,
      jum = 0;
    filter = target.value.toUpperCase();
    table = document.getElementById("listJournal");
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
        jum += parseFloat(td[1].innerText);
      } else {
        tr[i].style.display = "none";
      }
    }
    this.setState({
      jumlah: jum,
      filter: target.value,
      tahun: target.value
    });
  }
  print = async e => {
    var divToPrint = document.getElementById("listJournal");
    var newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  };

  addReportIn = async e => {
    e.preventDefault();
    const payload = {
      tanggal: this.state.tanggal,
      idBird: this.state.idBird,
      pembeli: this.state.pembeli,
      nominal: this.state.nominal,
      keterangan: this.state.keterangan
    };

    await api.insertFinanceIn(payload).then(res => {
      window.alert(`Report inserted successfully`);
      this.getReportFromDb();
    });

    await api.updateBirdById(this.state.idBird).then(res => {
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };
  addReportOut = async e => {
    e.preventDefault();
    const payload = {
      tanggal: this.state.tanggal,
      nominal: this.state.nominal,
      keterangan: this.state.keterangan
    };

    await api.insertFinanceOut(payload).then(res => {
      window.alert(`Report inserted successfully`);
      this.getReportFromDb();
    });
    //registerburung(burungData);
  };
  render() {
    const stat = ["Terjual", "Stok"];
    const { data } = this.state;
    const { file } = this.state;
    const { jumlah } = this.state;
    const { filter } = this.state;
    const { tahun } = this.state;
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
            <h1 className="display-4"> Keuangan</h1>
            <p className="lead">
              Detail Keuangan digunakan untuk melihat laporan keuangan dan
              transaksi burung kenari.
            </p>
            <div class="dropdown">
              <button
                class="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pilih Jenis Transaksi
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg-pendapatan"
                  href="#pendapatan"
                >
                  Pemasukan
                </a>
                <a
                  class="dropdown-item"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg-pengeluaran"
                  href="#exampleModalLabel"
                  href="#pengeluaran"
                >
                  Pengeluaran
                </a>
              </div>
            </div>

            {/* pendapatan */}
            <div
              className="modal fade bd-example-modal-lg-pendapatan"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg-pendapatan" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="pendapatan">
                      Tambah Transaksi Pendapatan
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
                          <label for="inputType">Tanggal</label>
                          <input
                            type="date"
                            className="form-control"
                            name="tanggal"
                            onChange={e => this.onChange(e)}
                            value={this.state.tanggal}
                          ></input>
                        </div>

                        <div className="form-group col-md-6">
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
                        <div className="form-group col-md-6">
                          <label for="inputCity">pembeli</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            name="pembeli"
                            onChange={e => this.onChange(e)}
                            // value="#"
                          ></input>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="inputCity">Nominal</label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputCity"
                            name="nominal"
                            onChange={e => this.onChange(e)}
                            value={this.state.nominal}
                          ></input>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlTextarea1">
                          Keterangan
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          name="keterangan"
                          onChange={e => this.onChange(e)}
                          value={this.state.keterangan}
                        ></textarea>
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
                          onClick={e => this.addReportIn(e)}
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
        {/* pengeluaran */}
        <div
          className="modal fade bd-example-modal-lg-pengeluaran"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg-pengeluaran" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="pengeluaran">
                  Tambah Transaksi Pengeluaran
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
                      <label for="inputType">Tanggal</label>
                      <input
                        type="date"
                        className="form-control"
                        name="tanggal"
                        onChange={e => this.onChange(e)}
                        value={this.state.tanggal}
                      ></input>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label for="inputCity">Nominal</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputCity"
                          name="nominal"
                          onChange={e => this.onChange(e)}
                          value={this.state.nominal}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">Keterangan</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      type="text"
                      name="keterangan"
                      onChange={e => this.onChange(e)}
                      value={this.state.keterangan}
                    ></textarea>
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
                      onClick={e => this.addReportOut(e)}
                    >
                      Tambahkan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="form-row" style={{ justifyContent: "space-between" }}>
            <div className="form-group col-md-3">
              {/* <label for="inputState">Laporan Penjualan Perbulan</label> */}
              <select
                type="text"
                name="filter"
                className="form-control"
                id="inputState"
                onChange={e => this.searchReport(e)}
              >
                <option value="" selected>
                  Plilih Bulan
                </option>
                <option value="January">Januari</option>
                <option value="February">Februari</option>
                <option value="March">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">July</option>
                <option value="Agustus">Agustus</option>
              </select>
              {/* <button type="button" className="btn btn-success">
                Hitung Total Penjualan
              </button> */}
            </div>

            <div className="form-group col-md-3">
              {/* <label for="inputState"></label> */}
              <select
                type="text"
                name="tahun"
                className="form-control"
                id="inputState"
                onChange={e => this.searchReport(e)}
              >
                <option value="" selected>
                  Plilih Tahun
                </option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <h5 style={{}}>Total Pendapatan Bulan {filter} Adalah</h5>
              <h5 style={{ fontWeight: "bold" }}>Rp.{jumlah},00</h5>
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
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Bulan</th>
                <th scope="col">Pemasukan</th>
                <th scope="col">Pengeluaran</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="listJournal">
              {file.length <= 0
                ? "NO DB ENTRIES YET"
                : file.map(fil => (
                    <tr>
                      <td>
                        {" " + months[fil._id.month - 1] + " " + fil._id.year}
                      </td>
                      <td>{fil.pendapatan}</td>
                      <td>{fil.pengeluaran}</td>
                      <td>
                        <Link
                          to={
                            "/DetailKeuangan?" +
                            fil._id.month +
                            "+" +
                            fil._id.year
                          }
                        >
                          <button className="btn btn-success">Detail</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </Container>
    );
  }
}
