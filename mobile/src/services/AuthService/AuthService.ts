import axios from 'axios';
import { injectable } from 'inversify';
import { IAuthService } from '../../dependencies/model';
import * as SecureStore from 'expo-secure-store';
import { isTokenExpired } from '../../utils/tokenUtil';

export const BASE_URL = `http://${process.env.PUBLIC_IP}:8001/`;
export const headers = {
    'Content-Type': 'application/json',
}

export const register = async (email: string, password: string, phoneNumber: string): Promise<any> => {
    const data = {
        email,
        password,
        phoneNumber
    }
    return await axios.post(`${BASE_URL}api/create`, data, {headers});
}

export const confirmAccount = async (code: string): Promise<any> => {
    const data = {
        code
    }
    return (await axios.post(`${BASE_URL}api/account-confirm`, data, {headers})).data;
}

export const login = async (email: string, password: string): Promise<any> => {
    const data = {
        email,
        password,
    }
    return (await axios.post(`${BASE_URL}api/login`, data, {headers})).data;
    
}

export const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('token');
}

// @injectable()
// export class AuthService implements IAuthService {

// }

// getAccessTokenUsingRefresh = async (refreshToken: string): Promise<string> => {
//     // await axios.get(`${BASE_URL}api/refresh-token`)
//     return "asd";
// }

// async getVerifiedAccessTokenOrFail(): Promise<string> {
//     const accessToken = await SecureStore.getItemAsync("access");

//     // if(!accessToken) throw new Error("No access token in storage.")

//     if(!isTokenExpired(accessToken)) return accessToken;

//     const refreshToken = await SecureStore.getItemAsync("refresh");

//     if(!isTokenExpired(refreshToken)) {
//         const newAccessToken = await this.getAccessTokenUsingRefresh(refreshToken);

//         await SecureStore.setItemAsync("access", newAccessToken);

//         return newAccessToken;
//     }
// }
