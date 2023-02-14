import axios from 'axios';
import 'swiper/css';

export const PatientList = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/collect/patient',
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};