import axios from 'axios';
import { BASE_URL, headers } from '../AuthService/AuthService';


export const getCardDetails = async (cardNumber: string): Promise<any> => {
    return await axios.get(`${BASE_URL}api/cards/${cardNumber}`, {headers});
}