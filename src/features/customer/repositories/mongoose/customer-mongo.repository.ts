import { ICustomer } from '../../interfaces/customer.interface'
import { CustomerRepositoryPort } from '../../interfaces/customerRepository.interface'
import CustomerModel from './customer.model'

export class CustomerRepositoryMongoDB implements CustomerRepositoryPort {
  async createCustomer(user: ICustomer) {
    const userCreated = await CustomerModel.create(user)
    return userCreated
  }

  async findAllCustomers() {
    const users = await CustomerModel.find()
    if (!users) {
      return []
    }

    return users
  }

  async findCustomerById(id: string) {
    const user = await CustomerModel.findById(id)
    if (!user) {
      return null
    }
    return user
  }

  async findCustomerByEmail(email: string) {
    const user = await CustomerModel.findOne({ email })
    if (!user) {
      return null
    }

    return user
  }

  async updateCustomerById(id: string, user: ICustomer) {
    const updateUser = await CustomerModel.findByIdAndUpdate(id, user, {
      new: true,
    })

    if (!updateUser) {
      return null
    }

    return updateUser
  }

  async deleteCustomerById(id: string) {
    const deleteUser = await CustomerModel.findByIdAndDelete(id)

    if (!deleteUser) {
      return false
    }
    return true
  }
}
