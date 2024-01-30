import { AuthCustomerRepositoryPort } from './auth-repository.model'
import { AuthRepositoryMongoDB } from './mongoose/auth-mongo.repository'

export class AuthCustomerRepository implements AuthCustomerRepositoryPort {

  private userRepository: AuthCustomerRepositoryPort

  constructor() {
    this.userRepository = new AuthRepositoryMongoDB()
  }

  async createCustomer(user: any) {
    return await this.userRepository.createCustomer(user)
  }

  async findCustomerByEmail(email: string) {
    return await this.userRepository.findCustomerByEmail(email)
  }

  async findCustomerById(id: string) {
    return await this.userRepository.findCustomerById(id)
  }

}
