import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://onix-intership-origin.getsandbox.com/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
axiosInstance.interceptors.response.use((responce) => {
    return responce.data;
});
export const ApiService = {
    get(resource, config) {
        return axiosInstance.get(resource, config);
    },
    post(resource, data, config) {
        return axiosInstance.post(resource, data, config);
    },
    put(resource, data, config) {
        return axiosInstance.put(resource, data, config);
    },
    delete(resource, config) {
        return axiosInstance.delete(resource, config);
    },
};
//# sourceMappingURL=api.js.map