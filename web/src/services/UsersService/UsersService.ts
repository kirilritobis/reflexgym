import axios from "axios";
import { IUserRestRaw } from "./model";

export const BASE_URL = `http://localhost:8001/`;
export const headers = {
  "Content-Type": "application/json",
};

export const getAll = async (): Promise<Array<IUserRestRaw>> => {
  return (await axios.get(`${BASE_URL}api/users/getAll`)).data;
};
