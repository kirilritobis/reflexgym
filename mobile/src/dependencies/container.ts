import { Container } from "inversify";
import { TYPES } from "./types";
import { IAuthService } from "./model";
import { AuthService } from "../services/AuthService/AuthService";
import "reflect-metadata";

const myContainer = new Container();
myContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService);

export { myContainer };