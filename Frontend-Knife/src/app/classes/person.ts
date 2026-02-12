import { Role } from "./role";

export class Person {
    id!:number;
    login?: string;
    password?: string;
    idRole?: Role;
}