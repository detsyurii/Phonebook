import axios from 'axios';

export const privateApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const publicApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const token = {
  set: token => {
    privateApi.defaults.headers.common.Authorization = token;
  },
  remove: token => {
    privateApi.defaults.headers.common.Authorization = null;
  },
};
