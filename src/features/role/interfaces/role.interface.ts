import { TypePersonEnum } from '../../shared/interfaces/person.interface'
import { KeyPermissionsType } from './permissions'

export interface IRole {
  id: string
  name: string
  description: string
  tags?: string[]
  permissions: KeyPermissionsType[]
  by: string // -> TypePersonEnum values
  users: string[] // -> id of user, customer, etc
  isActive: boolean
  requires2FA?: boolean
  createdAt?: Date
  updatedAt?: Date
}
