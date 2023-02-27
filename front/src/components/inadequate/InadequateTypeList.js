import axios from 'axios';

export const inadequate_typeList = async () => {
  try {
    const response = await axios.get(
      'http://kosa701.iptime.org:50051/api/collect/inadequate_typeList',
    );
    return response.data;
  } catch (error) {
    const response = { data: 'error' };
    return response;
  }
};
