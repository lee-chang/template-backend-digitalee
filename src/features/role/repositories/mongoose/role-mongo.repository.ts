import { IRole } from '../../interfaces/role.interface'
import { RoleModel } from './role.model'
import { RoleRepositoryPort } from '../../interfaces/roleRepository.interface'
import {
  PaginateData,
  initialPaginateData,
} from '../../../../core/interfaces/resPaginate.interface'

export class RoleRepositoryMongoDB implements RoleRepositoryPort {
  async findAllRoles(
    page: number,
    limit: number
  ): Promise<PaginateData<IRole>> {
    const totalRoles = await RoleModel.countDocuments()

    const totalPages = Math.ceil(totalRoles / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const roles = await RoleModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!roles) {
      return initialPaginateData
    }

    let response: PaginateData<IRole> = {
      total: totalRoles,
      totalPages,
      currentPage,
      data: roles,
    }
    return response
  }

  async findRoleById(id: string) {
    const role = await RoleModel.findById(id)
    return role
  }

  async findRoleByName(name: string) {
    const role = await RoleModel.findOne({ name: name })
    return role
  }

  async findRolesForType(forRole: string, page: number, limit: number) {
    const totalRoles = await RoleModel.countDocuments({
      by: forRole,
    })

    const totalPages = Math.ceil(totalRoles / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const roles = await RoleModel.find({ by: forRole })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!roles) {
      return initialPaginateData
    }

    let response: PaginateData<IRole> = {
      total: totalRoles,
      totalPages,
      currentPage,
      data: roles,
    }
    return response
  }

  async findRole(query: Partial<IRole>) {
    const roles = await RoleModel.find(query)
    return roles
  }

  async createRole(rol: IRole) {
    const newRole = new RoleModel(rol)
    const roleCreated = await newRole.save()
    return roleCreated
  }

  async updateRoleById(id: string, rol: IRole) {
    const updateRol = await RoleModel.findByIdAndUpdate(id, rol, { new: true })
    return updateRol
  }

  async deleteRoleById(id: string) {
    const deleteRole = await RoleModel.findByIdAndDelete(id)
    return deleteRole ? true : false
  }
}
