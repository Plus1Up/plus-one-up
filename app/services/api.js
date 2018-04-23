import axios from 'config/axios';

export const clients = {
  new: (data) => (
    axios.post('/clients', data)
  ),
  get: (id) => (
    axios.get(`/clients/${id}`)
  ),
  put: (id, data) => (
    axios.put(`/clients/${id}`, data)
  ),
};
