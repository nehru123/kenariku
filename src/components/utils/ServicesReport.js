import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/report',
})

export const insertReport = payload => api.post(`/add`, payload)
export const getAllBirds = () => api.get(`/getburung`)
export const getAllReports = () => api.get(`/getreport`)
export const updateReportById = (id, payload) => api.put(`/update/${id}`, payload)
export const deleteReportById = id => api.delete(`/delete/${id}`)
export const getReportById = id => api.get(`/find/${id}`)

const apis = {
    insertReport,
    getAllBirds,
    getAllReports,
    updateReportById,
    deleteReportById,
    getReportById
}

export default apis