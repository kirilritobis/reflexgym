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
