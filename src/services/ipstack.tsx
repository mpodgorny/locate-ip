import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type getDataType = {
  data: Record<string, unknown>;
  latitude: number;
  longitude: number;
};

const api: AxiosInstance = axios.create({
  baseURL: 'http://api.ipstack.com/',
  params: {
    access_key: '96bc7384404d1f6616513ac28fb5f289',
  },
});

const getCurrentLocation = (): Promise<AxiosResponse<getDataType>> => {
  return api.get('check/');
};

const getSearch = (query: string): Promise<AxiosResponse<getDataType>> => {
  return api.get(query, { params: { query } });
};

export { getCurrentLocation, getSearch };
