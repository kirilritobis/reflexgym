import axios from 'axios'
import { injectable } from 'inversify'
import { IAuthService } from '../../dependencies/model'

export const BASE_URL = `http://${process.env.PUBLIC_IP}:8001/`;
export const headers = {
    'Content-Type': 'application/json',
}

@injectable()
export class AuthService implements IAuthService {
    register = async (username: string, password: string, email: string): Promise<string> => {
        const data = {
            username,
            password,
            email,
        }
        await axios.post(`${BASE_URL}api/create`, data, {headers});
        return '';
    }
    
    login = async (username: string, password: string): Promise<string> => {
        const data = {
            username,
            password,
        }
        await axios.post(`${BASE_URL}api/login`, data, {headers});
        return '';
    }
}