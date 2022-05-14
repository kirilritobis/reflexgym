import axios from "axios";
import { IUserRestRaw } from "./model";

export const BASE_URL = `http://localhost:8001/`;
export const headers = {
  // "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdG9kb3JvdjEzQGdtYWlsLmNvbSIsImNhcmROdW1iZXIiOjIyLCJ1c2VySWQiOjYxLCJpYXQiOjE2NTIyOTUxMzEsImV4cCI6MTY1MjMxMzEzMX0.9bvaT8P4-RFfvW1DLHo3P-Qs3uAVwzGmx4mR9mU4mcI",
};

export const getAll = async (): Promise<Array<IUserRestRaw>> => {
  return (await axios.get(`${BASE_URL}api/users/getAll`, { headers })).data;
};

export const uploadImage = async (image: FormData): Promise<any> => {
  const data = {
    image,
  };

  return await axios.post(`${BASE_URL}api/users/bahur/uploadPhotoTest`, data, {
    headers,
  });
};

export const loadUserByCardNumber = async (
  cardNumber: string
): Promise<any> => {
  return "user";
};
