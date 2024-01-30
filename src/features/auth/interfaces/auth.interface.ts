import { TypePerson, TypePersonEnum } from "../../shared/interfaces/person.interface";

export interface IAuthCredentials {
    email: string;
    password: string;
    rememberMe?: boolean
    userName?: string
}


export interface userData {
    id: string
    userName: string
    email: string
    role: string[]
  }
  
export interface resAuth {
    user: userData
    type: string // -> TypePersonEnum values
    token: string
  }