import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.projectone.uk';

const api = axios.create({
    baseURL
});

export function toFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach(key => formData.append(key, obj[key]));
    return formData;
}

export default api;