import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { Response, Request, NextFunction } from 'express'
import { CustomerRoleService } from '../services/customer-role.service'

export class CustomerRoleController {
  static async updateCustomerRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params
    const { role }: { role: [string] } = req.body // -> role: [idRole1, idRole2, ...]

    try {
      const customerUpdated = await CustomerRoleService.updateCustomerRolesById(
        id,
        role
      )
      return res.status(HttpStatus.OK).send(customerUpdated)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
