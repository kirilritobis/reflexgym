import axios from "axios";
import { IUserRestRaw } from "./model";

export const BASE_URL = `http://localhost:8001/`;
export const headers = {
  // "Content-Type": "application/json",
  // "Content-Type": "multipart/form-data",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdG9kb3JvdjEzQGdtYWlsLmNvbSIsImNhcmROdW1iZXIiOjIyLCJ1c2VySWQiOjYxLCJpYXQiOjE2NTI1MzM4MTEsImV4cCI6MTY1MjU1MTgxMX0.lRVZEdzQE-rN1nqEVADOndhl24o2RUFr9D3AhTyj9-g",
};

export const getAll = async (): Promise<Array<IUserRestRaw>> => {
  return (await axios.get(`${BASE_URL}api/users/getAll`, { headers })).data;
};

export const uploadImage = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${BASE_URL}api/users/uploadPhoto`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const loadUserByCardNumber = async (
  cardNumber: string
): Promise<any> => {
  return "user";
};
