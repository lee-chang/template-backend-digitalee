import { IAuthCredentials } from "../../interfaces/auth.interface"
import { ICustomer } from '../../../customer/interfaces/customer.interface'

export interface AuthCustomerRepositoryPort {
  createCustomer(user: ICustomer): Promise<ICustomer>
  findCustomerByEmail(email: string): Promise<ICustomer | null>
  findCustomerById(id: string): Promise<ICustomer | null>
}
