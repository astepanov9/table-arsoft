import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://638a89507220b45d227e9261.mockapi.io',
  timeout: 1000,
  // headers: {
  //   Authorization: `Bearer ` + token,
  // },
});
