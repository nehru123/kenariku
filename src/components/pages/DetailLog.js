import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/ServicesBreeding";
import api2 from "../utils/ServicesReport";

const Container = styled.nav`
  .jumbotron {
    background-image: url("");
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
  .Myrecord {
    display: flex;
    justify-content: flex-start;
  }
`;

export default class DetailLog extends Component {
  state = {
    nama: "",
    tanggal: "",
    jam: "",
    log: "",
    pakan: "",
    status: "",
    namaUp: "",
    tanggalUp: "",
    jamUp: "",
    logUp: "",
    pakanUp: "",
    statusUp: "",
    data: [],
    file: [],
    idUp: "",
    id: 0
  };
  componentDidMount = async () => {
    var query = window.location.search.substring(1);
    await api.getBreedingById(query).then(bird => {
      console.log(bird);
      this.setState({
        file: bird.data.data
      });
    });
    await api.getNameById(query).then(bird => {
      console.log(bird);
      this.setState({
        data: bird.data.data
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
    var query = window.location.search.substring(1);
    api.getBreedingById(query).then(bird => {
      console.log(bird);
      this.setState({
        file: bird.data.data
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
    var divToPrint = document.getElementById("listReports");
    var newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  };

  addReport = async e => {
    e.preventDefault();
    window.alert(this.state.tanggal);
    const payload = {
      nama: this.state.nama,
      tanggal: this.state.tanggal,
      jam: this.state.jam,
      log: this.state.log,
      pakan: this.state.pakan,
      status: this.state.status
    };

    await api2.insertReport(payload).then(res => {
      window.alert(`Report inserted successfully`);
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };
  updateData = async e => {
    e.preventDefault();

    const payload = {
      nama: this.state.namaUp,
      tanggal: this.state.tanggalUp,
      jam: this.state.jamUp,
      log: this.state.logUp,
      pakan: this.state.pakanUp,
      status: this.state.statusUp
    };

    await api2.updateReportById(this.state.idUp, payload).then(res => {
      window.alert(`Report updated successfully`);
    });
    //registerburung(burungData);
  };
  deleteData = async e => {
    e.preventDefault();
    await api.deleteReportById(this.state.idUp).then(res => {
      window.alert(`Bird deleted successfully`);
    });
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
            <h1 className="display-4">Breeding Log</h1>
            <p className="lead">
              Breeding Log digunakan untuk monitoring proses pemeliharaan burung
              kenari dengan menambahkanny ke batch
            </p>
            <button
              type="button"
              className="btn btn-success"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
            >
              Tambah Log
            </button>
            <span>
              {" "}
              <button
                type="button"
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Akhiri Batch
              </button>
              <div
                class="modal fade"
                id="exampleModalLong"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Warning
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>Apakah ingin mengakhiri batch ?</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        No
                      </button>
                      <button type="button" class="btn btn-primary">
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                      Tambahkan
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
                        <div className="form-group col-md-6">
                          <label for="inputUmur">Status</label>
                          <select
                            type="text"
                            name="status"
                            className="form-control"
                            id="inputCity"
                            onChange={e => this.onChange(e)}
                            value={this.state.status}
                          >
                            <option selected>Choose</option>
                            <option value="Normal">Breeding Activity</option>
                            <option value="Sakit">Kawin</option>
                            <option value="Pemulihan">Bertelur</option>
                            <option value="Kritis">Perkembangan</option>
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label for="inputType">Tanggal</label>
                          <input
                            type="date"
                            className="form-control"
                            name="tanggal"
                            onChange={e => this.onChange(e)}
                            value={this.state.tanggal}
                          ></input>
                        </div>
                        <div className="form-group col-md-12">
                          <label for="inputType">Jam</label>
                          <input
                            type="time"
                            className="form-control"
                            name="jam"
                            onChange={e => this.onChange(e)}
                            value={this.state.jam}
                          ></input>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlTextarea1">Log</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="log"
                          onChange={e => this.onChange(e)}
                          value={this.state.log}
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
        <div>
          <div className="container">
            {/* <div className="input-group ">
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
            </div> */}
            <h3>Batch 1</h3>
            <div className="Myrecord">
              <p style={{ margin: 10 }}>Id Jantan :F1-001</p>
              <p style={{ margin: 10 }}>Id Betina :F1-006</p>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Log</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Jam</th>
                  <th scope="col">Tanggal</th>
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
                            <th scope="row">{fil.status}</th>
                            <td>{fil.log}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{fil.jam}</td>
                            <td>
                              {d.getDate() +
                                " " +
                                months[d.getMonth()] +
                                " " +
                                d.getFullYear()}
                              {/* <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#updateReport"
                                onClick={e => this.setState({
                                  namaUp:fil.nama,
                                  tanggalUp:fil.tanggal,
                                  jamUp:fil.jam,
                                  logUp:fil.log,
                                  pakanUp:fil.pakan,
                                  statusUp:fil.status
                                
                                })}
                              >
                                Edit Log
                              </button>
                              <div
              className="modal fade bd-example-modal-lg"
              tabindex="-1"
              id="updateReport"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Log
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
                          <label for="inputName">Nama</label>
                          <select
                            type="text"
                            name="namaUp"
                            className="form-control"
                            id="inputState"
                            onChange={e => this.onChange(e)}
                            value={this.state.namaUp}
                          >
                            <option selected>Choose</option>
                            {data.length <= 0
                              ? "NO DB ENTRIES YET"
                              : data.map(dat => (
                                  <option value={dat.name}>{dat.name}</option>
                                ))}
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label for="inputType">Tanggal</label>
                          <input
                            type="date"
                            className="form-control"
                            name="tanggalUp"
                            onChange={e => this.onChange(e)}
                            value={this.state.tanggalUp}
                          ></input>
                        </div>
                        <div className="form-group col-md-4">
                          <label for="inputType">Jam</label>
                          <input
                            type="time"
                            className="form-control"
                            name="jamUp"
                            onChange={e => this.onChange(e)}
                            value={this.state.jamUp}
                          ></input>
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="exampleFormControlTextarea1">Log</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="logUp"
                          onChange={e => this.onChange(e)}
                          value={this.state.logUp}
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="inputCity">Pakan</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            name="pakanUp"
                            onChange={e => this.onChange(e)}
                            value={this.state.pakanUp}
                          ></input>
                        </div>
                        <div className="form-group col-md-6">
                          <label for="inputUmur">Status</label>
                          <select
                            type="text"
                            name="statusUp"
                            className="form-control"
                            id="inputCity"
                            onChange={e => this.onChange(e)}
                            value={this.state.statusUp}
                          >
                            <option selected>Choose</option>
                            <option value="Normal">Normal</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Pemulihan">Pemulihan</option>
                            <option value="Kritis">Kritis</option>
                          </select>
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
                          onClick={e => this.updateData(e)}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                  </div>
                </div>
                      </div>

                              <span>
                                {"   "}
                              <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={e => this.setState({
                          idUp:fil._id
                        })}
                      >
                        <i class="fa fa-trash"></i>
                      </button>
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                class="modal-title"
                                id="exampleModalLabel"
                              ></h5>
                              <button
                                type="button"
                                class="close"
                                name="idUp"
                                data-dismiss="modal"
                                aria-label="Close"
                                value={fil.idUp}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div
                              style={{ fontWeight: "bold" }}
                              class="modal-body"
                            >
                              Yakin Menghapus Data ?
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            
                              <button type="button" 
                                onClick={e => this.deleteData(e)}
                                data-dismiss="modal"
                              class="btn btn-danger">
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                     </span>
             */}
                              {/* <span>
                                {""}
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck1"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="defaultCheck1"
                                  >
                                    Done
                                  </label>
                                </div>
                              </span> */}
                            </td>
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
