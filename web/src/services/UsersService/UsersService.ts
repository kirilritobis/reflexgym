import axios from "axios";
import { IUserRestRaw } from "./model";

export const BASE_URL = `http://localhost:8001/`;
export const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdG9kb3JvdjEzQGdtYWlsLmNvbSIsImNhcmROdW1iZXIiOjIyLCJ1c2VySWQiOjYxLCJpYXQiOjE2NTE4NDAzNDcsImV4cCI6MTY1MTg1ODM0N30.u7Nj_cHoyvAFxs2v3-7nLlZ0ucWUrv5F3sIdVOaMbLA",
};

export const getAll = async (): Promise<Array<IUserRestRaw>> => {
  return (await axios.get(`${BASE_URL}api/users/getAll`, { headers })).data;
};

export const uploadImage = async (base64: any): Promise<any> => {
  const data = {
    base64,
  };

  return (
    await axios.post(`http://localhost:8001/api/users/bahur/uploadPhotoTest`),
    { data: "ivan" }
    // { headers }
  );
};
