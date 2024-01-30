import { ICustomer } from '../interfaces/customer.interface'
import { CustomerRepository } from '../repositories/customer.repository'
import { RoleRepository } from '../../role/repositories/role.repository'

import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception' 
import { ErrorExt } from '../../../core/utils/http.response.util'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'



const customerRepository = new CustomerRepository()
const roleRepository = new RoleRepository()

export class CustomerRoleService {
  static async updateCustomerRolesById(id: string, roles: [string]): Promise<ICustomer> {

    // Validar si el usuario existe
    const findCustomer = await customerRepository.findCustomerById(id)
    const customer = notUndefinedOrNull(findCustomer)

    const { role: oldRoles } = customer


    // Validar si los roles existen

    const invalidRoles = await Promise.all(
      roles.map(async (id) => {
        const roleFound = await roleRepository.findRoleById(id)
        return roleFound ? null : id
      })
    )

    if (invalidRoles.some((role) => role !== null)) {
      throw new ErrorExt(`The roles ${invalidRoles.join(', ')} are invalid`, HttpStatus.BAD_REQUEST)
    }

    if (JSON.stringify(roles) === JSON.stringify(oldRoles)) {
      throw new ErrorExt('The roles are the same', HttpStatus.BAD_REQUEST)
    }

    const newRoleList: string[] = [...oldRoles]

    const someNewRoles = roles.filter((r) => !oldRoles.includes(r))

    await Promise.all(
      someNewRoles.map(async (idRole) => {
        await UtilsService.addCustomerInRol(customer.id, idRole)
        newRoleList.push(idRole)
      })
    )

    const someRemovedRoles = oldRoles.filter((r) => !roles.includes(r))

    await Promise.all(
      someRemovedRoles.map(async (idRole) => {
        await UtilsService.removeUserInRol(customer.id, idRole)
        const index = newRoleList.indexOf(idRole)
        if (index !== -1) {
          newRoleList.splice(index, 1)
        }
      })
    )

    // console.log('isNewRole', someNewRoles)
    // console.log('isDeleteRole', someRemovedRoles)

    customer.role = newRoleList

    const updatedCustomer = await customerRepository.updateCustomerById(id, customer)
    return notUndefinedOrNull(updatedCustomer)
  }
}


// ** UTILS

class UtilsService {
  static async addCustomerInRol(idUser: string, idRole: string) {
    const role = await roleRepository.findRoleById(idRole)

    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // ** Validar que el usuario no este duplicado en el array de usuarios del rol

    const { users: customer } = role

    let isDuplicatedUser = false

    customer.forEach((u) => {
      if (u === idUser) isDuplicatedUser = true
    })

    if (!isDuplicatedUser) {
      role.users.push(idUser)

      const updateRole = await roleRepository.updateRoleById(idRole, role)
      return updateRole
    }

    return role
  }

  static async removeUserInRol(idUser: string, idRole: string) {
    const role = await roleRepository.findRoleById(idRole)

    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    const { users: customer } = role

    const index = customer.indexOf(idUser)

    if (index > -1) {
      customer.splice(index, 1)
    }

    const updateRole = await roleRepository.updateRoleById(idRole, role)
    return updateRole
  }
}
