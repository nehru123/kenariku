import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import api from '../utils/ServicesBurung';

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
  .action {
    text-align: end;
  }
`;
export default class FarmManagement extends Component {
  state = {
    path: "http://localhost:5000/img/",
    name: "",
    nameUp:"",
    deskirpsiUp:"",
    jenisUp:"",
    warnaUp:"",
    jenis_kelaminUp: "",
    umurUp:"",
    hargaUp: "",
    statusUp: "",
    jenis: "",
    warna: "",
    jenis_kelamin: "",
    umur: "",
    harga: "",
    data: [],
    idUp:"",
    id: 0,
    image1: "",
    image1Up: "",
    image2: "",
    image2Up: "",
    image3: "",
    image3Up: "",
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
    this.setState({ isLoading: true })
     await api.getAllBirds().then(bird => {
       console.log(bird)
      this.setState({
        data: bird.data.data,
        isLoading: false,
      })
    })
  }
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    api.getAllBirds().then(bird => {
      this.setState({
        data: bird.data.data,
      })
    })
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
      if (c > 0) {tr[i].style.display = "";}
      else{tr[i].style.display = "none";}
    } 
  }

  addBird = async (e) =>  {
    e.preventDefault();

    const payload = {
      name: this.state.name,
      deskripsi: this.state.deskripsi,
      jenis: this.state.jenis,
      warna: this.state.warna,
      jenis_kelamin: this.state.jenis_kelamin,
      umur: this.state.umur,
      harga: this.state.harga,
      status: 0,
      image1: this.state.image1,
      image2: this.state.image2,
      image3: this.state.image3
    };

    await api.insertBird(payload).then(res => {
            window.alert(`Bird inserted successfully`);
            this.getDataFromDb();
        })
    //registerburung(burungData);
  }
  updateData = async (e) =>  {
    e.preventDefault();

    const payload = {
      name: this.state.nameUp,
      deskripsi: this.state.deskripsiUp,
      jenis: this.state.jenisUp,
      warna: this.state.warnaUp,
      jenis_kelamin: this.state.jenis_kelaminUp,
      umur: this.state.umurUp,
      harga: this.state.hargaUp,
      status: this.state.statusUp,
      image1: this.state.image1Up,
      image2: this.state.image2Up,
      image3: this.state.image3Up
    };

    await api.updateBirdById(this.state.idUp,payload).then(res => {
            window.alert(`Bird updated successfully`);
            this.getDataFromDb();
        })
    //registerburung(burungData);
  }
    deleteData = async () =>  {
    await api.deleteBirdById(this.state.idUp).then(res => {
      window.alert(`Bird deleted successfully`);
      this.getDataFromDb();
    })
    //registerburung(burungData);
  }

  uploadImage  = async ({ target }) =>{  
    var image = document.getElementById(target.name).files[0];
    var formdata = new FormData();
    formdata.append('files',image,image.name);
    await api.upload(formdata).then(res => {
      if (res.data.success) {
        window.alert("Gambar "+target.name+" berhasil di upload");
        this.setState({
          [target.name]: res.data.data
        });
      }else{window.alert(res.data.data);}      
    })
  }

  render() {
    // Select options for status
    // const optionGender = [
    //   { label: "* Select Gender", value: 0 },
    //   { label: "jantan", value: "jantan" },
    //   { label: "betina", value: "betina" }
    // ];
    const { data } = this.state;
    const stat = ["Terjual", "Stok"];
    return (
      <Container>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Farm Management</h1>
            <p className="lead">
              Farm management digunakan untuk melihat dan menambahkan data
              burung kenari.
            </p>
            <button
              type="button"
              className="btn btn-success"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
            >
              Register Burung
            </button>

        

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
                        Register Burung
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
                            <label for="inputName">Nama</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              onChange={e => this.onChange(e)}
                              required
                            ></input>
                          </div>
                          <div className="form-group col-md-6">
                            <label for="inputType">Jenis</label>
                            <input
                              type="text"
                              name="jenis"
                              className="form-control"
                              onChange={e => this.onChange(e)}
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
                            required
                          ></textarea>
                        </div>

                        <div className="form-row">
                          <div className="form-group col-md-3">
                            <label for="inputCity">Warna</label>
                            <input
                              type="text"
                              name="warna"
                              className="form-control"
                              id="inputCity"
                              onChange={e => this.onChange(e)}
                              required
                            ></input>
                          </div>
                          <div className="form-group col-md-3">
                            <label for="inputCity">Jenis Kelamin</label>
                            <select 
                              type="text"
                              name="jenis_kelamin"
                              className="form-control"
                              id="inputCity"
                              onChange={e => this.onChange(e)}
                              value={this.state.jenis_kelamin}
                              >
                              <option selected>Choose</option>
                              <option value="Jantan">Jantan</option>
                              <option value="Betina">Betina</option>
                            </select>
                          </div>

                          <div className="form-group col-md-3">
                            <label for="inputUmur">Umur (Bulan)</label>
                            <input
                              name="umur"
                              type="number"
                              className="form-control"
                              id="inputZip"
                              onChange={e => this.onChange(e)}
                              value={this.state.umur}
                              required
                            ></input>
                          </div>
                          <div className="form-group col-md-3">
                            <label for="inputHarga">Harga (Rupiah)</label>
                            <input
                              name="harga"
                              type="number"
                              className="form-control"
                              id="inputZip"
                              onChange={e => this.onChange(e)}
                              required
                              value={this.state.harga}
                            ></input>
                          </div>
                        </div>


                        <div className="form-row">
                          <div className="form-group col-md-3">
                            <label for="inputCity">Gambar Depan</label>
                            <input type="file" id="image1"/>
                            <div class="form-group">
                              <button type="button" name="image1" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
                            </div>
                          </div>
                          <div className="form-group col-md-3">
                            <label for="inputCity">Gambar Depan</label>
                            <input type="file" id="image2"/>
                            <div class="form-group">
                              <button type="button" name="image2" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
                            </div>
                          </div>

                          <div className="form-group col-md-3">
                            <label for="inputCity">Gambar Depan</label>
                            <input type="file" id="image3"/>
                            <div class="form-group">
                              <button type="button" name="image3" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
                            </div>
                          </div>
                        </div>


                        {/* <div className="form-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="inputGroupFile02"
                            ></input>
                            <label
                              class="custom-file-label"
                              for="inputGroupFile02"
                              aria-describedby="inputGroupFileAddon02"
                            >
                              Choose file
                            </label>{" "}
                          </div>{" "}
                          <div class="input-group-append">
                            <br></br>{" "}
                            <span
                              class="input-group-text"
                              id="inputGroupFileAddon02"
                            >
                              Upload
                            </span>
                          </div>
                        </div> */}

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" data-dismiss="modal" className="btn btn-success" onClick={e => this.addBird(e)}>
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
            <h2>List Burung Kenari</h2>
            <p></p>
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

            {/* Table Bird */}
            <table className="table" id="listBirds">
              <tbody>
              {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
              
                <tr>
                  <td>
                    <img
                      src={this.state.path+dat.image1}
                      width="50px"
                      height="50px"
                    ></img>
                  </td>
                  <td>{dat.name}</td>
                  <td>{dat.jenis}</td>
                  <td>{dat.warna}</td>
                  <td>{dat.umur}</td>
                  <td>{dat.jenis_kelamin}</td>
                  <td>{dat.harga}</td>
                  <td>{stat[dat.status]}</td>
                  <td className="action">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-toggle="modal"
                      data-target="#updatelah"
                      onClick={e => this.setState({
                        nameUp:dat.name,
                        jenisUp:dat.jenis,
                        warnaUp:dat.warna,
                        umurUp:dat.umur,
                        jenis_kelaminUp:dat.jenis_kelamin,
                        deskirpsiUp:dat.deskripsi,
                        idUp:dat._id,
                        hargaUp:dat.harga,
                        statusUp:dat.status,
                        image1Up:dat.image1,
                        image2Up:dat.image2,
                        image3Up:dat.image3,
                      })}
                    >
                      <i class="fa fa-edit"></i>
                    
                      Edit
                    </button>
                    <div
                      className="modal fade bd-example-modal-lg"
                      tabindex="-1"
                      role="dialog"
                      id="updatelah"
                      aria-labelledby="myLargeModalLabel"
                      aria-hidden="true"
                    >
                      {/* edit */}
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Edit Data Burung
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
                            <form >
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  <label for="inputName">Nama</label>
                                  <input
                                    type="name"
                                    name="nameUp"
                                    className="form-control"
                                    onChange={e => this.onChange(e)}
                                    value={this.state.nameUp}
                                  ></input>
                                </div>
                                <div className="form-group col-md-6">
                                  <label for="inputType">Jenis</label>
                                  <input
                                    type="name"
                                    name="jenisUp"
                                    className="form-control"
                                    onChange={e => this.onChange(e)}
                                    value={this.state.jenisUp}
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
                                  name="deskripsiUp"
                                  onChange={e => this.onChange(e)}
                                  value={this.state.deskirpsiUp}
                                ></textarea>
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-3">
                                  <label for="inputCity">warna</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                    name="warnaUp"
                                    onChange={e => this.onChange(e)}
                                    value={this.state.warnaUp}
                                  ></input>
                                </div>
                                <div className="form-group col-md-3">
                                  <label for="inputState">Jenis Kelamin</label>
                                  <select 
                                    type="text"
                                    name="jenis_kelaminUp"
                                    className="form-control"
                                    id="inputState"
                                    value={this.state.jenis_kelaminUp}
                                    onChange={e => this.onChange(e)}
                                    >
                                    <option selected>Choose</option>
                                    <option value="Jantan">Jantan</option>
                                    <option value="Betina">Betina</option>
                                  </select>
                                </div>
                                <div className="form-group col-md-3">
                                  <label for="inputUmur">Umur (Bulan)</label>
                                  <input
                                    type="number"
                                    name="umurUp"
                                    className="form-control"
                                    id="inputZip"
                                    onChange={e => this.onChange(e)}
                                    value={this.state.umurUp}
                                  ></input>
                                </div>
                                <div className="form-group col-md-3">
                                  <label for="inputHarga">Harga (Rupiah)</label>
                                  <input
                                    name="hargaUp"
                                    type="number"
                                    className="form-control"
                                    id="inputZip"
                                    onChange={e => this.onChange(e)}
                                    value={this.state.hargaUp}
                                  ></input>
                                </div>
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-3">
                                  <label for="inputCity">Gambar Depan</label>
                                  <input type="file" id="image1Up"/>
                                  <div class="form-group">
                                    <button type="button" name="image1Up" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
                                  </div>
                                </div>
                                <div className="form-group col-md-3">
                                  <label for="inputCity">Gambar Depan</label>
                                  <input type="file" id="image2Up"/>
                                  <div class="form-group">
                                    <button type="button" name="image2Up" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
                                  </div>
                                </div>

                                <div className="form-group col-md-3">
                                  <label for="inputCity">Gambar Depan</label>
                                  <input type="file" id="image3Up"/>
                                  <div class="form-group">
                                    <button type="button" name="image3Up" class="btn btn-primary" onClick={e => this.uploadImage(e)}>Upload</button>
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
                                  type="button"
                                  className="btn btn-success"
                                  onClick={e => this.updateData(e)}
                                  data-dismiss="modal"
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
                      {" "}
                      <Link to={"/lihat?"+dat._id} classNameName="card-link">
                        <button type="button" className="btn btn-primary">
                          <i class="fa fa-eye"></i>
                          Lihat
                        </button>
                      </Link>
                    </span>
                    <span>
                      {" "}
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={e => this.setState({
                          idUp:dat._id
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
                                value={dat.idUp}
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
                  </td>
                  <td></td>
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
