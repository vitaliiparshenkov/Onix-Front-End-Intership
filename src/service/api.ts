import axios, {AxiosRequestConfig} from 'axios';

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
  get(resource: any, config?: AxiosRequestConfig) {
    return axiosInstance.get(resource, config);
  },

  post(resource: any, data: any, config?: AxiosRequestConfig) {
    return axiosInstance.post(resource, data, config);
  },

  put(resource: any, data: any, config?: AxiosRequestConfig) {
    return axiosInstance.put(resource, data, config);
  },

  delete(resource: any, config?: AxiosRequestConfig) {
    return axiosInstance.delete(resource, config);
  },
};
