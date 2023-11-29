import axios from "axios";
import { userTypes } from "../types/userTypes";

export const showData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/employee/show");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const showDataId = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/employee/show/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (data: userTypes) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/employee/create",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (id: string, updateData: userTypes) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/employee/update/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/employee/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
