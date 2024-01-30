import { IUser } from '../../../../user/interfaces/user.interface'
import { AuthUserRepositoryPort } from '../auth-repository.model'
import UserModel from '../../../../user/repositories/mongoose/user.model'

export class AuthUserRepositoryMongoDB implements AuthUserRepositoryPort {
  async createUser(user: IUser) {
    const userCreated = await UserModel.create(user)
    return userCreated
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return null
    }

    return user
  }

  async findUserById(id: string) {
    const user = await UserModel.findById(id)
    if (!user) {
      return null
    }
    return user
  }

}
