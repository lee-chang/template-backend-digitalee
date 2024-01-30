import { ICustomer } from '../../../../customer/interfaces/customer.interface'
import { AuthCustomerRepositoryPort } from '../auth-repository.model'
import CustomerModel from '../../../../customer/repositories/mongoose/customer.model'

export class AuthRepositoryMongoDB implements AuthCustomerRepositoryPort {
  async createCustomer(user: ICustomer) {
    const userCreated = await CustomerModel.create(user)
    return userCreated
  }

  async findCustomerByEmail(email: string) {
    const user = await CustomerModel.findOne({ email })
    if (!user) {
      return null
    }

    return user
  }

  async findCustomerById(id: string) {
    const user = await CustomerModel.findById(id)
    if (!user) {
      return null
    }
    return user
  }

}
