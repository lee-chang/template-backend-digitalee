import { IAuthCredentials } from '../../interfaces/auth.interface'
import { IUser } from '../../../user/interfaces/user.interface'

export interface AuthUserRepositoryPort {
  createUser(user: IUser): Promise<IUser>
  findUserByEmail(email: string): Promise<IUser | null>
  findUserById(id: string): Promise<IUser | null>
}
