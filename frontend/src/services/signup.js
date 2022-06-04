import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/blogs';
const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/create`, newObject);
  return response.data;
}

const userServices = { getAll, create }
export default userServices;
