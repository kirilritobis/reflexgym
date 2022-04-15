import { createContext } from 'react';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

export interface IExtractedToken {
  userId: string;
  cardNumber: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IExtractedToken;
  setLoginState: ({isLoggedIn, user}: {isLoggedIn: boolean, user: IExtractedToken}) => void,
}

export const getToken = async () => await SecureStore.getItemAsync("token") || '';

export const extractUser = (token: string): IExtractedToken => {
    const user: any = jwtDecode(token);
    return {...user, id: user.userId.toString(), cardNumber: user.cardNumber.toString()}
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: { userId: "", cardNumber: "", email : "", iat: 0, exp: 0},
    setLoginState: () => {},
  });
  