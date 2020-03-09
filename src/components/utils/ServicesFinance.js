import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/finance"
});

export const insertFinanceIn = payload => api.post(`/addPendapatan`, payload);
export const insertFinanceOut = payload => api.post(`/addPengeluaran`, payload);
export const getAllBirds = () => api.get(`/getburung`);
export const getAllReports = () => api.get(`/get`);
export const getReportsById = id => api.get(`/getById/${id}`);
export const getBirdById = id => api.get(`/getBirdById/${id}`);
export const getReportsByIdMonth = id => api.get(`/getByMonth/${id}`);
export const updateBirdById = id => api.put(`/update/${id}`);
const apis = {
  insertFinanceIn,
  insertFinanceOut,
  getAllBirds,
  getAllReports,
  updateBirdById,
  getReportsById,
  getReportsByIdMonth,
  getBirdById
};

export default apis;
