import axios from "../api/api"; 

const BASE_URL = "/technologies";

const createTechnology = (data) => {
  return axios.post(BASE_URL, data);
};

const getAllTechnologies = () => {
  return axios.get(BASE_URL);
};

export default {
  createTechnology,
  getAllTechnologies
};
