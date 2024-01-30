import { ICustomer } from "./customer.interface"

export interface CustomerRepositoryPort {
  createCustomer(user: ICustomer): Promise<ICustomer>
  findAllCustomers(): Promise<ICustomer[]>
  findCustomerById(id: string): Promise<ICustomer | null>
  findCustomerByEmail(email: string): Promise<ICustomer | null>
  updateCustomerById(id: string, user: ICustomer): Promise<ICustomer | null>
  deleteCustomerById(id: string): Promise<Boolean>
}