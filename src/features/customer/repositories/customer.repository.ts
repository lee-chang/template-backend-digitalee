import { CustomerRepositoryPort } from '../interfaces/customerRepository.interface'
import { CustomerRepositoryMongoDB } from './mongoose/customer-mongo.repository'

export class CustomerRepository implements CustomerRepositoryPort {

  private customerRepository: CustomerRepositoryPort

  constructor() {
    this.customerRepository = new CustomerRepositoryMongoDB()
  }

  async createCustomer(user: any) {
    return await this.customerRepository.createCustomer(user)
  }

  async findAllCustomers() {
    return await this.customerRepository.findAllCustomers()
  }

  async findCustomerById(id: string) {
    return await this.customerRepository.findCustomerById(id)
  }

  async findCustomerByEmail(email: string) {
    return await this.customerRepository.findCustomerByEmail(email)
  }

  async updateCustomerById(id: string, user: any) {
    return await this.customerRepository.updateCustomerById(id, user)
  }

  async deleteCustomerById(id: string) {
    return await this.customerRepository.deleteCustomerById(id)
  }
}
