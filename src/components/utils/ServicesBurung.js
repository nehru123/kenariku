import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/burung',
})
const apimg = axios.create({
    baseURL: 'http://localhost:5000',
})

export const insertBird = payload => api.post(`/add`, payload)
export const getAllBirds = () => api.get(`/getburung`)
export const updateBirdById = (id, payload) => api.put(`/update/${id}`, payload)
export const deleteBirdById = id => api.delete(`/delete/${id}`)
export const getBirdById = id => api.get(`/find/${id}`)
export const getBirdReportById = id => api.get(`/findReport/${id}`)
export const upload = payload => apimg.post(`/upload`, payload)

const apis = {
    insertBird,
    getAllBirds,
    updateBirdById,
    deleteBirdById,
    getBirdById,
    upload,
    getBirdReportById
}

export default apis