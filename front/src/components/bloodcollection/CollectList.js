import axios from 'axios';

export const collectlist = async () => {
  try {
    const response = await axios.get(
      'http://kosa701.iptime.org:50051/api/collect/collectlist',
    );

    //전처리
    response.data.map((collect, i) => {
      collect.id = collect.specimenNo + collect.orderNo;
    });

    return response.data;
  } catch (error) {
    const response = { data: 'error' };
    return response;
  }
};
