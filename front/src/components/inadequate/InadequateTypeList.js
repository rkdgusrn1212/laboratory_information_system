
import axios from "axios";

export const inadequate_typeList = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/collect/inadequate_typeList");
    return response.data;

  } catch (error) {
    console.log(error);
  }
};
