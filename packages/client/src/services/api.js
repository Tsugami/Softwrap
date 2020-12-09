import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL || `http://localhost:3333`,
});

export function getUsers(data = {}) {
  const query = new URLSearchParams(data);
  return api.get(`/users?${query}`).then(res => res.data)
}

export function createUser(userData) {
  return api.post('/users', userData)
}

export function updateUser(userId, userData) {
  return api.put(`/users/${userId}`, userData)
}

export function deleteUser(userId) {
  return api.delete(`/users/${userId}`)
}
