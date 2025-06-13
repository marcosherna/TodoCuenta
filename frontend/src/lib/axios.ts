import axios from "axios"; 


const BASE_URL_API = import.meta.env.VITE_API_URL; 

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => { 
    return Promise.reject(
      new Error(
        error.response?.data?.message ||
          "An error occurred while processing your request."
      )
    );
  }
);

export { axiosInstance as axios, BASE_URL_API as baseUrlApi };
