import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/blogs';
const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = async newObject => {
  try {
    const response = await axios.post(`${baseUrl}/create`, newObject);
    return response;
  } catch (exception) {
    return exception;
  }
}

const userServices = { getAll, create }
export default userServices;
