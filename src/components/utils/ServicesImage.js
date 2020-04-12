import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/image"
});
const apiup = axios.create({
  baseURL: "http://localhost:5000"
});

export const insertImage = payload => api.post(`/add`, payload);
export const getImage = id => api.get(`/getImage/${id}`);
export const deleteGById = id => api.delete(`/delete/${id}`);
export const uploadImg = payload => apiup.post(`/upload`, payload);

const apis = {
 	insertImage,
	getImage,
	deleteGById,
	uploadImg,
};

export default apis;
