import jwt_decode from "jwt-decode";

export const isTokenExpired = (token: string | null): boolean => {
    if(!token) return true;
  var decoded: any = jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}