import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { IRole } from '../interfaces/role.interface'
import { RoleRepository } from '../repositories/role.repository'
import { notUndefinedOrNull } from '../../../core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '../../../core/utils/http.response.util'
import { KeyPermissionsType } from '../interfaces/permissions'

const roleRepository = new RoleRepository()

export class RoleSevice {
  // ** CRUD

  static async findAllRoles(page: number, limit: number) {
    const roles = await roleRepository.findAllRoles(page, limit)
    return notUndefinedOrNull(roles)
  }

  static async findRoleById(id: string) {
    const role = await roleRepository.findRoleById(id)
    return notUndefinedOrNull(role)
  }

  static async updateRoleById(id: string, role: IRole) {
    const roleUpdated = await roleRepository.updateRoleById(id, role)
    return notUndefinedOrNull(roleUpdated)
  }

  static async findRoleByName(name: string) {
    const role = await roleRepository.findRoleByName(name)
    return notUndefinedOrNull(role)
  }

  static async findRoleByFor(forType: string, page: number, limit: number) {
    const role = await roleRepository.findRolesForType(forType, page, limit)
    return notUndefinedOrNull(role)
  }

  static async deleteRoleById(id: string) {
    const role = await roleRepository.findRoleById(id)
    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)
    const roleDeleted = await roleRepository.deleteRoleById(id)
    return notUndefinedOrNull(roleDeleted)
  }

  static async createRole(role: IRole) {
    const validName = await roleRepository.findRoleByName(role.name)
    if (validName) throw new ErrorExt('NAME_NOT_VALID', HttpStatus.BAD_REQUEST)

    const roleCreated = await roleRepository.createRole(role)
    return notUndefinedOrNull(roleCreated)
  }

  static async updatePermissionsByRoleId(
    id: string,
    permissions: [KeyPermissionsType]
  ) {
    const role = await roleRepository.findRoleById(id)
    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    role.permissions = permissions

    const roleUpdated = await roleRepository.updateRoleById(id, role)

    return roleUpdated
  }
}
