import { Payload } from '../../interfaces/jwt.payload.interface'

import { IAuthCredentials } from '../../interfaces/auth.interface'
import { AuthUserRepository } from '../repositories/auth.repository'
import { HttpStatus } from '../../../../core/interfaces/httpStatus.interface'

import { ErrorExt } from '../../../../core/utils/http.response.util'
import { AuthUtil } from '../../utils/auth.util'
import { ToolRoleService } from '../../../role/services/toolRole.service'
import { TypePersonEnum } from '../../../shared/interfaces/person.interface'

const authRepository = new AuthUserRepository()

export class AuthUserService {
  private static authRepository = authRepository

  static async createUser(user: IAuthCredentials) {
    const hashedPassword = await AuthUtil.hashPassword(user.password)
    user.password = hashedPassword

    const newUser = await this.authRepository.createUser(user)

    if (!newUser) throw new ErrorExt('USER_NOT_CREATED')

    console.log("newUserSuper Admin", newUser)
    const roles = await ToolRoleService.nameRoleByIdOfArray(newUser.role)

    const payload: Payload = {
      id: newUser.id,
      type: TypePersonEnum.user,
      role: roles,
    }
    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: newUser }
  }

  static async authenticationUser(user: IAuthCredentials) {
    const isRememberMe = user.rememberMe ? user.rememberMe : false

    const userFount = await this.authRepository.findUserByEmail(user.email)
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
      type: 'user',
      role: roles,
      rememberMe: isRememberMe,
    }

    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: userFount }
  }
}
