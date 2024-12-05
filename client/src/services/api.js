import axios from 'axios';

// Create the Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to dynamically add the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Fetch the latest token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const  login = async (data) => {

    try {
        const response = await api.post('api/auth/login', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

}

export const register = async (data) => {

    try {

        const {confirmPassword, ...rest} = data;

        const response = await api.post('api/auth/register', rest);

        return response.data;

    } catch (error) {

        console.log(error);

        return error.response.data;

    }
}

export const getTasks = async () => {

    try {
        
        const response = await api.get('api/user/task');
        return response.data;

    } catch (error) {

        return error.response.data;
        
    }
}

export const addTask = async (data) => {

    try {
        const response = await api.post('api/user/task', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}


 export const deleteTask = async (id) => {

    try {
        const response = await api.delete(`api/user/task/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const updateTask = async (id, data) => {

    try {
        const response = await api.put(`api/user/task/${id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const fetchTaskStatistics = async () => {

    try {
        const response = await api.get('api/user/statistics');
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}


