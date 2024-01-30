import { ICustomer } from '../../../customer/interfaces/customer.interface'
import { Payload } from '../../interfaces/jwt.payload.interface'

import { IAuthCredentials } from '../../interfaces/auth.interface'
import { AuthCustomerRepository } from '../repositories/auth.repository'
import { HttpStatus } from '../../../../core/interfaces/httpStatus.interface'

import { ErrorExt } from '../../../../core/utils/http.response.util'
import { AuthUtil } from '../../utils/auth.util'
import { ToolRoleService } from '../../../role/services/toolRole.service'
import { TypePersonEnum } from '../../../shared/interfaces/person.interface'

const authRepository = new AuthCustomerRepository()

export class AuthCustomerService {
  private static authRepository = authRepository

  static async createCustomer(user: ICustomer) {
    const hashedPassword = await AuthUtil.hashPassword(user.password)
    user.password = hashedPassword

    const newCustomer = await this.authRepository.createCustomer(user)

    if (!newCustomer) throw new ErrorExt('CUSTOMER_NOT_CREATED')

    console.log("newUserCustomer", newCustomer)
    const roles = await ToolRoleService.nameRoleByIdOfArray(newCustomer.role)

    console.log("roles", roles)

    const payload: Payload = {
      id: newCustomer.id,
      type: TypePersonEnum.customer,
      role: roles,
    }
    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: newCustomer }
  }

  static async authenticationCustomer(user: IAuthCredentials) {
    const isRememberMe = user.rememberMe ? user.rememberMe : false

    const userFount = await this.authRepository.findCustomerByEmail(user.email)
    if (!userFount)
      throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const validPassword = await AuthUtil.comparePassword(
      user.password,
      userFount.password
    )

    if (!validPassword)
      throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const roles = await ToolRoleService.nameRoleByIdOfArray(userFount.role)

    const payload: Payload = {
      id: userFount.id,
      type: 'customer',
      role: roles,
      rememberMe: isRememberMe,
    }

    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: userFount }
  }
}
