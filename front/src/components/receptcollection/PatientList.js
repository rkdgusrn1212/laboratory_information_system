import axios from 'axios';
import 'swiper/css';

export const PatientList = async () => {
  try {
    const response = await axios.get(
      `http://kosa701.iptime.org:50051/api/patient/list?pageSize=1000&pageStart=0`,
    );

    response.data.map((Patient) => {
      Patient.id = Patient.patientNo;
    });

    return response.data;
  } catch (error) {
    const response = { data: 'error' };
    return response;
  }
};
