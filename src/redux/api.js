import axios from "axios";

const API = axios.create({
    baseURL: `https://notapembayaran.vercel.app/`,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
    }
    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);

export const createNota = (notaData) => API.post("/nota", notaData);
export const getNotas = (page) => API.get(`/nota?page=${page}`);
export const getNota = (id) => API.get(`/nota/${id}`);
export const updateNota = (updatedNotaData, id) =>
    API.patch(`/nota/${id}`, updatedNotaData);
export const deleteNota = (id) => API.delete(`/nota/${id}`);

export const getNotasBySearch = (searchQuery) =>
    API.get(`/nota/search?searchQuery=${searchQuery}`);

export const getNotasByDate = (startDate, endDate) =>
    API.get(`/nota/dateRange?startDate=${startDate}&endDate=${endDate}`);

export const getNotasByStatus = (statusQuery) =>
    API.get(`/nota/statusFilter?statusQuery=${statusQuery}`);

export const getnotaStatus = (theStatusQuery) => API.get(`/nota/${theStatusQuery}`)

export const getNotasByAllFilter = (startDate, endDate, statusQuery, searchQuery) =>
    startDate && endDate && statusQuery && searchQuery ?
    API.get(`/nota/filter?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}&statusQuery=${statusQuery}`) :
    startDate && endDate && searchQuery ?
    API.get(`/nota/filter?searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`) :
    startDate && endDate && statusQuery ?
    API.get(`/nota/filter?startDate=${startDate}&endDate=${endDate}&statusQuery=${statusQuery}`) :
    API.get(`/nota/filter?startDate=${startDate}&endDate=${endDate}`)