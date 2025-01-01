import axios from 'axios';

const API_URL = 'http://localhost:5102/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/user');
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/user', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
};

export const getRoles = async () => {
    const response = await api.get('/role');
    return response.data;
};

export const getUserRoles = async (userId) => {
    const response = await api.get(`/user/${userId}/roles`);
    return response.data;
};

export const assignRoles = async (userId, roleIds) => {
    const response = await api.post(`/user/${userId}/roles`, roleIds);
    return response.data;
}; 