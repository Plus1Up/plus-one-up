import axios from 'config/axios';

export const clients = {
  new: (data) => (
    axios.post('api/clients', data)
  ),
  get: (id) => (
    axios.get(`api/clients/${id}`)
  ),
  put: (id, data) => (
    axios.put(`api/clients/${id}`, data)
  ),
};

export const diets = {
  get: (clientId, dietPlanFileName) => (
    axios.get(`system/clients/${clientId}/diet_plan/${dietPlanFileName}`, {
      responseType: "arraybuffer",
      headers: {"Accept": "application/pdf"}
    })
  ),
};

export const trainings = {
  new: (clientId, data) => (
    axios.post(`api/clients/${clientId}/trainings`, data)
  ),
  all: (clientId) => (
    axios.get(`api/clients/${clientId}/trainings`)
  ),
  get: (clientId, id) => (
    axios.get(`api/clients/${clientId}/trainings/${id}`)
  ),
  put: (clientId, id, data) => (
    axios.put(`api/clients/${clientId}/trainings/${id}`, data)
  ),
};
