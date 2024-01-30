import { AuthUserRepositoryPort } from './auth-repository.model'
import { AuthUserRepositoryMongoDB } from './mongoose/auth-mongo.repository'

export class AuthUserRepository implements AuthUserRepositoryPort {

  private userRepository: AuthUserRepositoryPort

  constructor() {
    this.userRepository = new AuthUserRepositoryMongoDB()
  }

  async createUser(user: any) {
    return await this.userRepository.createUser(user)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email)
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserById(id)
  }

}
