import { Payload } from '../../interfaces/jwt.payload.interface'
import { ErrorExt } from '../../../../core/utils/http.response.util'
import { HttpStatus } from '../../../../core/interfaces/httpStatus.interface'
import { IAuthCredentials, resAuth, userData } from '../../interfaces/auth.interface'

import { AuthUserService } from './auth-user.service'
import { AuthUserRepository } from '../repositories/auth.repository'

import { ToolRoleService } from '../../../role/services/toolRole.service'
import { TypePersonEnum } from '../../../shared/interfaces/person.interface'
import { IUser } from '../../../user/interfaces/user.interface'

const authRepository = new AuthUserRepository()

export class AuthService {
  

  static async registerService(user: IUser) {


    const avalibleUser = await authRepository.findUserByEmail(user.email)

    const isExistEmail = avalibleUser ? true : false

    if (isExistEmail)
      throw new ErrorExt('EMAIL_ALREADY_EXIST', HttpStatus.BAD_REQUEST)

    const newUser = await AuthUserService.createUser(user)

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
      type: TypePersonEnum.user,
      token: newUser.token,
    }
    return data
  }

  static async loginService(auth: IAuthCredentials) {

    const loginUser = await AuthUserService.authenticationUser(auth)
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
      type: TypePersonEnum.user,
      token: token,
    }
    return data

  }

  static async logoutService(user: IAuthCredentials) {}

  static async meService(user: Payload) {

    const userFound = await authRepository.findUserById(user.id)
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
