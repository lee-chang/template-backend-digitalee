import { UserRepositoryPort } from '../interfaces/userRepository.interface'
import { UserRepositoryMongoDB } from './mongoose/user-mongo.repository'

export class UserRepository implements UserRepositoryPort {

  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepositoryMongoDB()
  }

  async createUser(user: any) {
    return await this.userRepository.createUser(user)
  }

  async findAllUsers() {
    return await this.userRepository.findAllUsers()
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserById(id)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email)
  }

  async updateUserById(id: string, user: any) {
    return await this.userRepository.updateUserById(id, user)
  }

  async deleteUserById(id: string) {
    return await this.userRepository.deleteUserById(id)
  }
}
