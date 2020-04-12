import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import GaleryCards from "../layouts/GaleryCards";
import { Howl } from "howler";
import api from "../utils/ServicesGallery";

const Contaner = styled.nav`
  .jumbotron {
    background-image: url("https://c1.wallpaperflare.com/preview/234/403/732/book-bird-cuckoo-background.jpgg");
    background-size: cover;
  }
  .col-md-4 {
    box-shadow: 8px 15px 25px 0 rgba(0, 0, 0, 0.16);
  }
`;

export default class Galery extends Component {
  state = {
    path: "http://localhost:5000/img/",
    name: "",
    namaBurung: "",
    deskripsi: "",
    jenisUp: "",
    warnaUp: "",
    jenis_kelaminUp: "",
    umurUp: "",
    hargaUp: "",
    status: "",
    judul: "",
    foto: "",
    jenis: "",
    warna: "",
    jenis_kelamin: "",
    umur: "",
    harga: "",
    data: [],
    file: [],
    idUp: "",
    id: 0,
    _id: "",
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getAllGallery().then(galleries => {
      console.log(galleries);
      this.setState({
        file: galleries.data.data,
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

  add = async e => {
    e.preventDefault();

    const payload = {
      namaBurung: this.state.namaBurung,
      judul: this.state.judul,
      deskripsi: this.state.deskripsi,
      foto: this.state.foto
    };

    await api.insertGallery(payload).then(res => {
      window.alert(`Collection successfully`);
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };

  deleteData = async () => {
    await api.deleteGById(this.state.idUp).then(res => {
      window.alert(`Bird deleted successfully`);
      this.getDataFromDb();
    });
    //registerburung(burungData);
  };

  uploadImage = async ({ target }) => {
    var image = document.getElementById(target.name).files[0];
    var formdata = new FormData();
    formdata.append("files", image, image.name);
    await api.upload(formdata).then(res => {
      if (res.data.success) {
        window.alert("Gambar " + target.name + " berhasil di upload");
        this.setState({
          [target.name]: res.data.data
        });
      } else {
        window.alert(res.data.data);
      }
    });
  };

  render() {
    const { data } = this.state;
    const { file } = this.state;
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Gallery</h1>
            <p className="lead">
              Gallery digunakan untuk melihat dan menambahkan Gallery burung
              kenari.
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
                        <div className="form-group col-md-6">
                          <label for="inputName">Burung</label>
                          <select
                            type="text"
                            name="namaBurung"
                            className="form-control"
                            id="inputState"
                            onChange={e => this.onChange(e)}
                            value={this.state.namaBurung}
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
                          <label for="inputCity">Judul</label>
                          <input
                            type="text"
                            name="judul"
                            className="form-control"
                            id="inputCity"
                            onChange={e => this.onChange(e)}
                            value={this.state.judul}
                            required
                          ></input>
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
                          value={this.state.deskripsi}
                          // onChange={e => this.onChange(e)}
                          required
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label for="inputCity">Gambar Depan</label>
                          <input type="file" id="foto" />
                          <div class="form-group">
                            <button
                              type="button"
                              name="foto"
                              class="btn btn-primary"
                              onClick={e => this.uploadImage(e)}
                            >
                              Upload
                            </button>
                          </div>
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
        </div>

        <Contaner>
          <div class="album py-5 bg-light">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <GaleryCards
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    picture="https://i2.wp.com/www.hewan.id/wp-content/uploads/2017/04/Jenis-Kenari-Border.jpg?w=600&ssl=1"
                  />
                </div>
                <div class="col-md-4">
                  <GaleryCards
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    picture="https://i0.wp.com/www.hewan.id/wp-content/uploads/2017/04/Jenis-Kenari-Yorkshire.jpg?w=600&ssl=1"
                  />
                </div>
                <div class="col-md-4">
                  <GaleryCards
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    picture="https://i1.wp.com/www.hewan.id/wp-content/uploads/2017/04/Jenis-Kenari-Norwich.jpg?w=600&ssl=1"
                  />
                </div>
              </div>
            </div>
          </div>
        </Contaner>
      </React.Fragment>
    );
  }
}
