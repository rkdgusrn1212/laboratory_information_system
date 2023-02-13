import axios from 'axios';

export const SubmitInadequateList = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/collect/submitinadequatelist',
    );
    //전처리
    response.data.map((submitinadequatelist) => {
      submitinadequatelist.id = submitinadequatelist.specimenNo;
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
