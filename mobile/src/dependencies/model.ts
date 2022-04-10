export interface IAuthService {
    register:(username: string, password: string, email: string) => Promise<string>;
    login:(username: string, password: string) => Promise<string>;
}