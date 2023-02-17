import axios from 'axios';

export const staffList = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/collect/staffall',
    );

    //전처리
    response.data.map((staff) => {
      if (staff.staffType === 1) staff.staffType = '의사';
      else {
        staff.staffType = '간호사';
      }
    });

    return response.data;
  } catch (error) {
    const response = { data: 'error' };
    return response;
  }
};
