import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/login';
const baseUrl = '/api/login';

const create = async newObject => {
  try {
    const response = await axios.post(`${baseUrl}/`, newObject);
    return response;
  } catch (err) {
    return err;
  }
}

const loginServices = { create }
export default loginServices;
