import { IAuthCredentials } from '../../auth/interfaces/auth.interface'
import { IPerson } from '../../shared/interfaces/person.interface'

export interface IUser extends IPerson, IAuthCredentials {
  id: string
  userName: string
  verified: boolean
  role: string[]
  login_code: string
  recovery_code: string
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}

