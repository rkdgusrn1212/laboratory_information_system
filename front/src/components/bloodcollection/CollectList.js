import axios from 'axios';

export const collectlist = async () => {
  try {
    const response = await axios.get(
      'http://13.209.219.162/api/collect/collectlist',
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
