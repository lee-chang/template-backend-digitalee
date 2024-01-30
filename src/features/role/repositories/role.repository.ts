import { RoleRepositoryPort } from '../interfaces/roleRepository.interface'
import { RoleRepositoryMongoDB } from './mongoose/role-mongo.repository'
import { IRole } from '../interfaces/role.interface'
import { PaginateData } from '../../../core/interfaces/resPaginate.interface'

export class RoleRepository implements RoleRepositoryPort {
  private roleRepository: RoleRepositoryPort

  constructor() {
    this.roleRepository = new RoleRepositoryMongoDB()
  }

  async findAllRoles(
    page: number,
    limit: number
  ): Promise<PaginateData<IRole>> {
    return await this.roleRepository.findAllRoles(page, limit)
  }

  async findRoleById(id: string): Promise<IRole | null> {
    return await this.roleRepository.findRoleById(id)
  }

  async findRoleByName(name: string): Promise<IRole | null> {
    return await this.roleRepository.findRoleByName(name)
  }

  async findRolesForType(
    forRole: string,
    page: number,
    limit: number
  ): Promise<PaginateData<IRole>> {
    return await this.roleRepository.findRolesForType(forRole, page, limit)
  }

  async createRole(role: IRole): Promise<IRole | null> {
    return await this.roleRepository.createRole(role)
  }

  async updateRoleById(id: string, rol: IRole): Promise<IRole | null> {
    return await this.roleRepository.updateRoleById(id, rol)
  }

  async deleteRoleById(id: string): Promise<Boolean> {
    return await this.roleRepository.deleteRoleById(id)
  }
}
