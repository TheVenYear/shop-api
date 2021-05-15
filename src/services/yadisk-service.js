import axios from 'axios';
import config from '../config';

const yadiskService = {
  upload: async (file, options = { size: 'L', crop: '1' }) => {
    const fileName = Date.now() + file.name;

    const instance = axios.create({
      headers: {
        Authorization: `OAuth ${config.YANDEX_KEY}`,
      },
    });

    const loadUrl = (
      await instance.get(
        `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Fapi%2F${encodeURIComponent(
          fileName
        )}`
      )
    ).data.href;

    await instance.put(loadUrl, file.data);

    await instance.put(
      `https://cloud-api.yandex.net/v1/disk/resources/publish?path=%2Fapi%2F${encodeURIComponent(
        fileName
      )}`
    );

    const publicKey = await (
      await instance.get(
        `https://cloud-api.yandex.net/v1/disk/resources?path=%2Fapi%2F${encodeURIComponent(
          fileName
        )}`
      )
    ).data.public_key;

    const previewUrl = new URL(
      (
        await instance.get(
          `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${encodeURIComponent(
            publicKey
          )}`
        )
      ).data.preview
    );

    const { searchParams } = previewUrl;

    searchParams.set('size', options.size);

    searchParams.set('crop', options.crop);

    previewUrl.search = searchParams.toString();

    return previewUrl;
  },
};

export default yadiskService;
