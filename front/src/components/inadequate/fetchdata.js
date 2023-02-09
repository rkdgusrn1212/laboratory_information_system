import React from "react";
import axios from "axios";

export const fetchdata = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/collect/inadequate_typeList");
    return response.data;

  } catch (error) {
    console.log(error);
  }
};
