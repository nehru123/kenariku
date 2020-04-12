import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/ServicesBatch";
import assets from "../assets/d.jpg";

const Container = styled.nav`
  .jumbotron {
    background-image: url("d.jpg");
    background-size: cover;
  }
  .table {
    border-radius: 5px;
    width: 100%;
    margin: 0px auto;
    float: none;
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
    idbreeding: window.location.search.substring(1),
    namaBatch: "",
    data: [],
    file: [],
    id: 0
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we inc orporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    var query = window.location.search.substring(1);
    await api.getBatchById(query).then(batch => {
      this.setState({
        data: batch.data.data
      });
    });
    await api.getName(query).then(name => {
      this.setState({
        file: name.data.data
      });
    });
    this.state.data.forEach(dat => (
      dat.status==1
      ?document.getElementById("addnew").disabled = true
      :""
    ));
  };
  
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    var query = window.location.search.substring(1);
    api.getBatchById(query).then(batch => {
      this.setState({
        data: batch.data.data
      });
    });
    this.state.data.forEach(dat => (
      dat.status==1
      ?document.getElementById("addnew").disabled = true
      :""
    ));
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

  addBatch = async e => {
    e.preventDefault();
    if (this.state.namaBatch) {
      const payload = {
        idbreeding: this.state.idbreeding,
        nama: this.state.namaBatch
      };
      await api.insertBatch(payload).then(res => {
        window.alert(`Batch inserted successfully`);
        document.getElementById("addnew").disabled = true;
        this.setState({
          nama: ""
        });
        this.getDataFromDb();
      });
    }else window.alert(`Mohon isi form dengan lengkap`);

    //registerburung(burungData);
  };

  deleteData = async () => {
    await api.deleteBirdById(this.state.idUp).then(res => {
      window.alert(`Batch deleted successfully`);
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
    const { file } = this.state;
    const stat = ["Finish", "On Progres"];

    return (
      <Container>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 style={{ textAlign: "center" }} className="display-12"></h1>

            
          </div>
        </div>
        <div>
          <div className="container">
            <div className="MyButton">
              <button
              id="addnew"
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Add New Batch
              </button>
            </div>

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
                      New Batch
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
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="inputCity">Nama Batch</label>
                          <input
                            type="text"
                            className="form-control"
                            id="namaBatch"
                            name="namaBatch"
                            onChange={e => this.onChange(e)}
                            // value="#"
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
                          onClick={e => this.addBatch(e)}
                        >
                          Tambahkan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <h3>Parent</h3>
            <div className="Myrecord">
            {file.map(fil => ("ID Jantan: "+fil.jantan+"    "+"ID Betina: "+fil.betina))}
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
                          <p>{dat.nama}</p>
                        </td>
                        <td>
                          <p style={{ fontWeight: "bold" }}>{stat[dat.status]}</p>
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
