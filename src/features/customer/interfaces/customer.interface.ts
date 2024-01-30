import { IAuthCredentials } from '../../auth/interfaces/auth.interface'
import { IPerson } from '../../shared/interfaces/person.interface'

export interface ICustomer extends IPerson, IAuthCredentials {
  id: string
  userName: string
  verified: boolean
  role: string[]
  login_code?: string
  recovery_code?: string
  orders?: string[] // -> id de las ordenes
  quotes?: string[] // -> id de las cotizaciones
  wishlist?: string[] // -> id de los productos
  createdAt?: Date
  updatedAt?: Date
}
