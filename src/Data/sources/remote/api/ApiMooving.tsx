import axios, { AxiosHeaders } from 'axios'
import { LocalStorage } from '../../local/LocalStorage'
import { User } from '../../../../Domain/entities/User'

const ApiMooving = axios.create({
    
    baseURL: 'http://45.7.231.169:3000/api',
    headers:{
        'Content-Type': 'application/json'
    }
})

const ApiMoovingForImage = axios.create({
    baseURL: 'http://45.7.231.169:3000/api',
    headers:{
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json'
    }
})

ApiMooving.interceptors.request.use(
    async (config) => {
      const data = await LocalStorage().getItem('user');
      if (data) {
        const user:User = JSON.parse(data as any);
        console.log('Token:', user?.session_token);
        config.headers['Authorization'] = `${user?.session_token}`;
      }
  
      return config;
    }
  );

ApiMoovingForImage.interceptors.request.use(
    async (config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers['Authorization'] = `${user?.session_token}`;
        }

        return config;
    }
);

export {ApiMooving,ApiMoovingForImage}