import axios from "axios";
import { token, BASE_URL } from "../constants";
import { IUserRestRaw } from "./model";

export const headers = {
  Authorization: token,
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
  const response = await fetch(
    `${BASE_URL}api/cards/detailsByUser/${cardNumber}`,
    {
      headers,
    }
  );
  return response.json();
};

export const markVisitation = async (cardNumber: string): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}api/cards/${cardNumber}/markVisitation`
  );

  return response.json();
};
