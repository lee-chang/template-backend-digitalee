import { IAddress } from "./address.interface";
import { IPhone } from "./phone.interface";

export interface IPerson {
    firstName: string;
    lastName: string;
    identificationType: IdentificationType;
    identification: string;
    birthDate?: Date
    phone?: IPhone[];
    address?: IAddress[];
}

export enum IdentificationType {
  dni = 'DNI',
  ruc = 'RUC',
  passport = 'PASAPORTE',
  foreign_license = 'CARNET EXTRANJERIA',
  other = 'OTRO'
}

export enum TypePersonEnum {
  user = 'system', // -> is a user of the system (admin, operator, manager, etc)
  customer = 'user', // ->  is a customer of the system (client)
}

export const valuesTypePerson = Object.values(TypePersonEnum) 

export type TypePerson = keyof typeof TypePersonEnum
