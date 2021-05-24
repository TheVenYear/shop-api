import axios from 'axios';
import config from '../config';

const instance = axios.create({
  headers: {
    Authorization: `OAuth ${config.YANDEX_KEY}`,
  },
  baseURL: 'https://webdav.yandex.ru:443/api/',
});

const yadiskService = {
  upload: async (file) => {
    const fileName = Date.now() + file.name;
    await instance.put(fileName, file.data);
    return `/api/media/${fileName}`;
  },
  get: async (fileName) => {
    const response = await instance.get(fileName, {
      responseType: 'arraybuffer',
    });
    return response;
  },
};

export default yadiskService;
