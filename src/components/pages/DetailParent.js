import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/ServicesBreeding";

const Container = styled.nav`
  .jumbotron {
    background-image: url("https://i.pinimg.com/originals/6b/20/16/6b201623685e7093fe7df8970b1d26b5.jpg");
    background-size: cover;
  }
  .table {
    border-radius: 5px;
    width: 100%;
    margin: 0px auto;
    float: none;
  }

  .card-counter {
    box-shadow: 2px 2px 10px #dadada;
    margin: 5px;
    padding: 20px 10px;
    background-color: #fff;
    height: 100px;
    border-radius: 5px;
    transition: 0.3s linear all;
  }

  .card-counter:hover {
    box-shadow: 4px 4px 20px #dadada;
    transition: 0.3s linear all;
  }

  .card-counter.primary {
    background-color: #007bff;
    color: #fff;
  }

  .card-counter.danger {
    background-color: #ef5350;
    color: #fff;
  }

  .card-counter.success {
    background-color: #66bb6a;
    color: #fff;
  }

  .card-counter.info {
    background-color: #26c6da;
    color: #fff;
  }

  .card-counter i {
    font-size: 5em;
    opacity: 0.2;
  }

  .card-counter .count-numbers {
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 32px;
    display: block;
  }

  .card-counter .count-name {
    position: absolute;
    right: 35px;
    top: 65px;
    font-style: italic;
    text-transform: capitalize;
    opacity: 0.5;
  }
  .MyButton {
    text-align: right;
    margin: 15px;
  }
  .Myrecord {
    display: flex;
    justify-content: flex-start;
  }
`;
export default class DetailParent extends Component {
  state = {
    path: "http://localhost:5000/img/",
    idbetina: "",
    idjantan: "",
    deskirpsi: "",
    data: [],
    betina: [],
    jantan: [],
    idUp: "",
    id: 0
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getBreeding().then(breed => {
      this.setState({
        data: breed.data.data
      });
    });
    await api.getBetina().then(birdF => {
      this.setState({
        betina: birdF.data.data
      });
    });
    await api.getJantan().then(birdM => {
      this.setState({
        jantan: birdM.data.data
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
    api.getBreeding().then(breed => {
      this.setState({
        data: breed.data.data
      });
    });
    api.getBetina().then(birdF => {
      this.setState({
        betina: birdF.data.data
      });
    });
    api.getJantan().then(birdM => {
      this.setState({
        jantan: birdM.data.data
      });
    });
  };

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  searchBird({ target }) {
    // Declare variables
    var filter, table, tr, td, i, j, txtValue, temp;
    filter = target.value.toUpperCase();
    table = document.getElementById("listBirds");
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

  imageVal = (gender, filter) => {
    for (var i = 0; i <= gender.length; i++) {
      if (gender[0].name == filter) {
        return gender[i];
      }
    }
  };

  addBreeding = async e => {
    e.preventDefault();
    var imageb = "",
      imagej = "";
    if (this.state.idbetina && this.state.idjantan) {
      imageb = this.imageVal(this.state.betina, this.state.idbetina);
      imagej = this.imageVal(this.state.jantan, this.state.idjantan);
    }
    window.alert(imageb.image1);
    const payload = {
      betina: this.state.idbetina,
      jantan: this.state.idjantan,
      imagebetina: imageb.image1,
      imagejantan: imagej.image1,
      deskripsi: this.state.deskripsi
    };
    if (
      payload.betina &&
      payload.jantan &&
      payload.deskripsi &&
      payload.imagebetina &&
      payload.imagejantan
    ) {
      await api.insertBreeding(payload).then(res => {
        window.alert(`Breeding inserted successfully`);
        this.setState({
          idbetina: "",
          idjantan: "",
          deskripsi: ""
        });
      });
      api.updateBirdById(imageb._id).then(res => {});
      api.updateBirdById(imagej._id).then(res => {
        this.getDataFromDb();
      });
    } else window.alert(`Mohon isi form dengan lengkap`);

    //registerburung(burungData);
  };

  deleteData = async () => {
    await api.deleteBirdById(this.state.idUp).then(res => {
      window.alert(`Breeding deleted successfully`);
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };

  preview = async ({ target }) => {
    var output = document.getElementById("output" + target.id);
    output.src = URL.createObjectURL(target.files[0]);
  };

  render() {
    const { data } = this.state;
    const { betina } = this.state;
    const { jantan } = this.state;

    return (
      <Container>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 style={{ textAlign: "center" }} className="display-4">
              Detail Parent
            </h1>
            <p className="lead"></p>

            <form id="addForm">
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
                        Breeding Record
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
                            <label for="inputCity">Id Betina</label>
                            <select
                              type="text"
                              name="idbetina"
                              className="form-control"
                              id="idbetina"
                              required
                              onChange={e => this.onChange(e)}
                              value={this.state.idbetina}
                            >
                              <option selected>Choose</option>
                              {betina.length <= 0
                                ? "NO DB ENTRIES YET"
                                : betina.map(bet => (
                                    <option value={bet.name}>{bet.name}</option>
                                  ))}
                            </select>
                          </div>

                          <div className="form-group col-md-12">
                            <label for="inputCity">Id Jantan</label>
                            <select
                              type="text"
                              name="idjantan"
                              className="form-control"
                              id="idjantan"
                              required
                              onChange={e => this.onChange(e)}
                              value={this.state.idjantan}
                            >
                              <option selected>Choose</option>
                              {jantan.length <= 0
                                ? "NO DB ENTRIES YET"
                                : jantan.map(jan => (
                                    <option value={jan.name}>{jan.name}</option>
                                  ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label for="exampleFormControlTextarea1">
                            Deskripsi
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="deskripsi"
                            onChange={e => this.onChange(e)}
                            required
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
                            type="submit"
                            className="btn btn-success"
                            onClick={e => this.addBreeding(e)}
                          >
                            Tambahkan
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Cari burung..."
                aria-label=""
                id="search"
                onChange={i => this.searchBird(i)}
                aria-describedby="basic-addon2"
              ></input>
            </div>
            <div className="MyButton">
              {/* <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
              >
                Batch Baru
              </button>
            </div> */}
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Add New Batch
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
                      <p>Are you Sure ?</p>
                      Mas.. nanti kalo pas klik Add New Batch di muncul modal
                      ini .. kalo yes nanti ada pesan eror jika ada batch yang
                      belum selesai / alias on progres tp kalo dah udah finish
                      jadi nanti bisa buat batch yang ke sekian(seumpama setelah
                      batch 1 adalah batch 2)
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
            </div>
            <h3>Parent 1</h3>
            <div className="Myrecord">
              <p style={{ margin: 10 }}>Id Jantan :F-11</p>
              <p style={{ margin: 10 }}>Id Betina :M-12</p>
            </div>

            {/* Table Bird */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"> Status</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="listBirds">
                {data.length <= 0
                  ? "NO DB ENTRIES YET"
                  : data.map(dat => (
                      <tr>
                        <td>
                          {" "}
                          <p>Batch 1</p>
                        </td>
                        <td>
                          <p style={{ fontWeight: "bold" }}>On Progres</p>
                        </td>
                        <td></td>

                        <td></td>
                        <td></td>
                        <td></td>

                        <td>
                          <span>
                            {" "}
                            <Link
                              to={"/DetailLog?" + dat._id}
                              classNameName="card-link"
                            >
                              <button type="button" className="btn btn-primary">
                                Lihat Detail
                              </button>
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    );
  }
}