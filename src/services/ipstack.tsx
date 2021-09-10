import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://api.ipstack.com/',
  params: {
    access_key: '96bc7384404d1f6616513ac28fb5f289',
  },
});

const getCurrentLocation = (): Promise<Record<string, any>> => {
  return api.get('check/', { timeout: 2 });
};

export { getCurrentLocation };
