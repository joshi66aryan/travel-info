import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";

const {REACT_APP_DEV_API,REACT_APP_PROD_API} =  process.env;

const API = axios.create({baseURL: `${devEnv? REACT_APP_DEV_API : REACT_APP_PROD_API}`});
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
export const createTourAPI = (tourData) => API.post("/tour",tourData);
export const getToursAPI = (page) => API.get(`/tour?page=${page}`);
export const getTourAPI = (id) => API.get(`/tour/${id}`);
export const deleteTourAPI = (id) => API.delete(`/tour/${id}`);
export const updateTourAPI = (updatedTourData,id) => API.patch(`/tour/${id}`,updatedTourData);
export const getToursByUserAPI = (userId) => API.get(`/tour/userTours/${userId}`);
export const getToursBySearch = (searchQuery) => API.get(`/tour/search?query=${searchQuery}`);
export const getToursByTagAPI = (tag) => API.get(`/tour/tag/${tag}`);
export const likeTour = (id) => API.patch(`/tour/like/${id}`)