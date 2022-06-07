import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/blogs';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data);
}

const remove = (id) => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const config = {
    headers: { Authorization: `bearer ${userDetails?.token}` },
  }
  const request = axios.delete(`${baseUrl}/remove/${id}`, config)
  return request.then(response => response.data);
}

const create = async newObject => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const config = {
    headers: { Authorization: `bearer ${userDetails?.token}` },
  }
  try {
    const response = await axios.post(`${baseUrl}/add`, newObject, config);
    return response;
  } catch (exception) {
    return exception;
  }
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/update/${id}`, newObject)
  return request.then(response => response.data);
}

const services = { getAll, create, update, remove }
export default services;
