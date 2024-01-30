import { TypePerson, TypePersonEnum } from "../../shared/interfaces/person.interface"

export interface Payload {
    id: string
    type: string // -> TypePersonEnum values 
    role: string[]
    rememberMe?: Boolean
}

