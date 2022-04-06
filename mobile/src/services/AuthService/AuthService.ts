import axios from 'axios'
import { injectable } from 'inversify'
import { IAuthService } from '../../dependencies/model'

export const BASE_URL = "localhost:8001/"

@injectable()
export class AuthService implements IAuthService {
    register = async (username: string, password: string, email: string): Promise<string> => {
        const data = {
            username,
            password,
            email,
        }
        await axios.post(`${BASE_URL}api/URL`, {data});
        return '';
    }
    
    login = async (username: string, password: string): Promise<string> => {
        const data = {
            username,
            password,
        }
        await axios.post(`${BASE_URL}api/URL`, {data});
        return '';
    }
}