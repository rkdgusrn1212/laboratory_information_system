import axios from 'axios';

export const SubmitInadequateList = async () => {
  try {
    const response = await axios.get(
      'http://kosa701.iptime.org:50051/api/collect/submitinadequatelist',
    );
    //전처리
    response.data.map((submitinadequatelist, i) => {
      submitinadequatelist.id = i;
    });

    return response.data;
  } catch (error) {
    const response = { data: 'error' };
    return response;
  }
};
