import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/login';
const baseUrl = '/api/login';

const create = async newObject => {
  const response = await axios.post(`${baseUrl}/`, newObject);
  return response.data;
}

const loginServices = { create }
export default loginServices;
