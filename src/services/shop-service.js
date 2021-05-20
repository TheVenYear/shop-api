import yadiskService from './yadisk-service';
import Rubric from '../models/rubric';

const changeRubric = async ({ image, ...dataParam }) => {
  const data = {
    ...dataParam,
    image: image ? await yadiskService.upload(image) : undefined,
  };
  return data;
};

const shopService = {
  addRubric: async (dataParam) => {
    const data = await changeRubric(dataParam);
    const rubric = new Rubric(data);
    await rubric.save();
    return rubric;
  },
};

export default shopService;
