import { CustomerRepository } from '../repositories/customer.repository'
import { ICustomer } from '../interfaces/customer.interface'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { AuthUtil } from '../../auth/utils/auth.util'

// import { addAbortSignal } from 'nodemailer/lib/xoauth2'

const customerRepository = new CustomerRepository()

export class CustomerService {
  private static customerRepository = customerRepository

  static async getCustomerById(id: string): Promise<ICustomer> {
    const customer = await this.customerRepository.findCustomerById(id)
    return notUndefinedOrNull(customer)
  }

  static async getAllCustomers(): Promise<ICustomer[]> {
    const users = await this.customerRepository.findAllCustomers()
    return users
  }

  static async updateCustomerById(id: string, user: ICustomer): Promise<ICustomer> {
    // Is exist user.password -> hash password
    if (user.password) {
      const passwordHashed = await AuthUtil.hashPassword(user.password)
      user.password = passwordHashed
    }

    const userUpdated = await this.customerRepository.updateCustomerById(id, user)

    return notUndefinedOrNull(userUpdated)
  }

  static async deleteCustomerById(id: string): Promise<Boolean> {
    const userDeleted = await this.customerRepository.deleteCustomerById(id)
    return notUndefinedOrNull(userDeleted)
  }

  static async createCustomer(user: ICustomer): Promise<ICustomer> {
    const userCreated = await this.customerRepository.createCustomer(user)
    return notUndefinedOrNull(userCreated)
  }

  static async updateCustomerPassword(
    id: string,
    password: string
  ): Promise<ICustomer> {
    const passwordHashed = await AuthUtil.hashPassword(password)

    const userUpdated = await this.customerRepository.updateCustomerById(id, {
      password: passwordHashed,
    })
    return notUndefinedOrNull(userUpdated)
  }

  // ** UTILS

  static async isCustomerExistWithEmail(email: string): Promise<Boolean> {
    const userFount = await this.customerRepository.findCustomerByEmail(email)
    return userFount ? true : false
  }

  static async isCustomerExistWithId(id: string): Promise<Boolean> {
    const userFount = await this.customerRepository.findCustomerById(id)
    return userFount ? true : false
  }
}
