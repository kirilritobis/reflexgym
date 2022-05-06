import axios from "axios";
import { IUserRestRaw } from "./model";

export const BASE_URL = `http://localhost:8001/`;
export const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdG9kb3JvdjEzQGdtYWlsLmNvbSIsImNhcmROdW1iZXIiOjIyLCJ1c2VySWQiOjYxLCJpYXQiOjE2NTE4MzgwODksImV4cCI6MTY1MTgzODk4OX0.30ivyndGWeJwImCQCxNw2pwb589cVMHOGb7dYmjAIvU",
};

export const getAll = async (): Promise<Array<IUserRestRaw>> => {
  return (await axios.get(`${BASE_URL}api/users/getAll`, { headers })).data;
};
