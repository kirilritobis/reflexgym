import { formatDate } from "../../utils/DateUtil";
import { BASE_URL, headers } from "../constants";

export const createPlan = async (
  startDate: Date,
  price: string,
  months: string,
  visits: string
): Promise<any> => {
  const data = {
    startDate: formatDate(startDate),
    price,
    months,
    visits,
  };

  const response = await fetch(`${BASE_URL}api/users/createPlan`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAllPlans = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}api/cards/all/plans`, {
    headers,
  });
  return response.json();
};

export const loadCard = async (): Promise<any> => {
  const cardNumber = "string";
  const data = {
    something: "some string",
  };
  const response = await fetch(`${BASE_URL}api/${cardNumber}/loadCard`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
};
