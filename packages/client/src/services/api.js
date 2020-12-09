import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL || `https://software-teste.herokuapp.com/`,
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
