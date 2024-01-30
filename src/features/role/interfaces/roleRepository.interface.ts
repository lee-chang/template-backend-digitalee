import { PaginateData } from '../../../core/interfaces/resPaginate.interface'
import { IRole } from './role.interface'

export interface RoleRepositoryPort {
  findAllRoles(page: number, limit: number): Promise<PaginateData<IRole>>
  findRoleById(id: string): Promise<IRole | null>
  findRoleByName(name: string): Promise<IRole | null>
  findRolesForType(forRole: string,page: number,
    limit: number): Promise<PaginateData<IRole>>
  createRole(rol: IRole): Promise<IRole | null>
  updateRoleById(id: string, rol: IRole): Promise<IRole | null>
  deleteRoleById(id: string): Promise<Boolean>
}
