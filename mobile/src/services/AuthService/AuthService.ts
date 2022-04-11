import axios from 'axios'
import { injectable } from 'inversify'
import { IAuthService } from '../../dependencies/model'

export const BASE_URL = `http://${process.env.PUBLIC_IP}:8001/`;
export const headers = {
    'Content-Type': 'application/json',
}

@injectable()
export class AuthService implements IAuthService {
    register = async (email: string, password: string, phoneNumber: string): Promise<any> => {
        const data = {
            email,
            password,
            phoneNumber
        }
        return await axios.post(`${BASE_URL}api/create`, data, {headers});
    }

    confirmAccount = async (code: string): Promise<any> => {
        const data = {
            code
        }
        return await axios.post(`${BASE_URL}api/account-confirm`, data, {headers});
    }
    
    login = async (email: string, password: string): Promise<any> => {
        const data = {
            email,
            password,
        }
        return await axios.post(`${BASE_URL}api/login`, data, {headers});
    }
}