import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/blogs';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/remove/${id}`)
  return request.then(response => response.data);
}

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/add`, newObject);
  return response.data;
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/update/${id}`, newObject)
  return request.then(response => response.data);
}

const services = { getAll, create, update, remove }
export default services;
