import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/finance',
})

export const insertFinance = payload => api.post(`/add`, payload)
export const getAllBirds = () => api.get(`/getburung`)
export const getAllReports = () => api.get(`/get`)
export const updateBirdById = (id) => api.put(`/update/${id}`)
const apis = {
    insertFinance,
    getAllBirds,
    getAllReports,
    updateBirdById
}

export default apis