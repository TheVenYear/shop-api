import axios from 'axios';
import config from '../config';

const instance = axios.create({
  headers: {
    Authorization: `OAuth ${config.YANDEX_KEY}`,
  },
  validateStatus: (status) => status < 500,
  baseURL: 'https://webdav.yandex.ru:443/api/',
});

const basePath = '/api/media/';

const yadiskService = {
  upload: async (file) => {
    const fileName = Date.now() + file.name;
    await instance.put(fileName, file.data);
    return basePath + fileName;
  },
  get: async (fileName) => {
    const response = await instance.get(fileName, {
      responseType: 'arraybuffer',
    });
    return response;
  },
  remove: async (filePath) => {
    const fileName = filePath.replace(basePath, '');
    await instance.delete(fileName);
  },
};

export default yadiskService;
