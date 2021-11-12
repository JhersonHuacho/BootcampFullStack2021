import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then( response => response.data);
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const deletePerson = personId => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then(response => response.statusText);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

const personsServices = {
  create,
  getAll,
  update,
  deletePerson
}

export default personsServices;