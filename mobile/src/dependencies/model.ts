export interface IAuthService {
    register:(username: string, password: string, email: string) => Promise<any>;
    login:(username: string, password: string) => Promise<any>;
    confirmAccount:(code: string) => Promise<any>;
}