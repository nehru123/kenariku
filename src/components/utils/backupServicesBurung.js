// import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import setAuthToken from "./setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { log } from "util";
// import { setPostLoading } from "./karyawanActions"

// Register users
export const registerusers = (userData, history) => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      return err;
    });
};
// Register burung
export const registerburung = (burungData, history) => {
  axios
    .post("http://localhost:5000/api/burung/add", burungData)
    .then(res => res.status(200).json(res.data))
    .catch(err => {
      return err;
    });
};

// login get user token
export const loginuser = userData => {
  // dispatch(setPostLoading());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;

      // set token to local storage
      localStorage.setItem("jwtToken", token);

      // Set token to Auth Header
      setAuthToken(token);
      // decode token to get user data with jwt-decode
      const decoded = jwt_decode(token);
      // set current user
      console.log("====================================");
      console.log("Decoded", decoded);
      console.log("====================================");
      // dispatch(setCurrentUser(decoded));
    })
    .catch(
      err => {
        return err;
      }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

export const addPost = (postData, config) => {
  axios
    .post(`/api/posts`, postData, config)
    .then(res => {
      alert("Berhasil menambahkan post!");
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const getBurung = () => {
  fetch('http://localhost:5000/api/burung/getburung')
      .then((res) => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
};

// set logged user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

// logout
export const logout = () => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove authorization token
  setAuthToken(false);
  // isAuthenticated = false, by empty the current user
  // dispatch(setCurrentUser({}));
};
