import { ICustomer } from '../../../customer/interfaces/customer.interface'
import { Payload } from '../../interfaces/jwt.payload.interface'
import { ErrorExt } from '../../../../core/utils/http.response.util'
import { HttpStatus } from '../../../../core/interfaces/httpStatus.interface'
import { IAuthCredentials, resAuth, userData } from '../../interfaces/auth.interface'

import { AuthCustomerService } from './auth-customer.service'
import { AuthCustomerRepository } from '../repositories/auth.repository'

import { ToolRoleService } from '../../../../features/role/services/toolRole.service'
import { TypePersonEnum } from '../../../shared/interfaces/person.interface'

const authRepository = new AuthCustomerRepository()

export class AuthService {
  

  static async registerService(user: ICustomer) {


    const avalibleUser = await authRepository.findCustomerByEmail(user.email)

    const isExistEmail = avalibleUser ? true : false

    if (isExistEmail)
      throw new ErrorExt('EMAIL_ALREADY_EXIST', HttpStatus.BAD_REQUEST)

    const newUser = await AuthCustomerService.createCustomer(user)

    // console.log('New user',newUser)

    if (!newUser) throw new ErrorExt('USER_NOT_CREATED', HttpStatus.BAD_REQUEST)

    const roles = await ToolRoleService.nameRoleByIdOfArray(newUser.user.role)
  
    const data: resAuth = {
      user: {
        id: newUser.user.id.toString(),
        userName: newUser.user.userName,
        email: newUser.user.email,
        role: roles,
      },
      type: TypePersonEnum.customer,
      token: newUser.token,
    }
    return data
  }

  static async loginService(auth: IAuthCredentials) {

    const loginUser = await AuthCustomerService.authenticationCustomer(auth)
    if (!loginUser)
      throw new ErrorExt('USER_NOT_LOGIN', HttpStatus.BAD_REQUEST)

    const { user: userLogged, token } = loginUser

    const roles = await ToolRoleService.nameRoleByIdOfArray(userLogged.role)
    
    const data: resAuth = {
      user: {
        id: userLogged.id,
        userName: userLogged.userName,
        email: userLogged.email,
        role: roles,
      },
      type: TypePersonEnum.customer,
      token: token,
    }
    return data

  }

  static async logoutService(user: IAuthCredentials) {}

  static async meService(user: Payload) {

    const userFound = await authRepository.findCustomerById(user.id)
    if (!userFound) throw new ErrorExt('USER_NOT_FOUND', HttpStatus.BAD_REQUEST)

    const roles = await ToolRoleService.nameRoleByIdOfArray(userFound.role)

    const data: userData = {
      id: userFound.id.toString(),
      userName: userFound.userName,
      email: userFound.email,
      role: roles,
    }
    return data
  }
}
