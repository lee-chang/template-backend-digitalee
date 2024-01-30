import { UserControlller } from '../controllers/user.controller'
// import { validatePermission } from '../../../core/middlewares/validatePermission'
import { Router } from 'express'
import { UserRoleController } from '../controllers/user-role.controller'

import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { validatePermission } from '../../../core/middleware/validatePermission.middleware'

import { UserSchema } from '../schemas/user.schema'
import Permission from '../../role/interfaces/permissions'

const router = Router()

// ** CRUD
router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_USER),
  UserControlller.getUsers
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_USER),
  UserControlller.getUser
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_USER),
  UserControlller.createUser
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_USER),
  validatorShema(UserSchema.Update),
  UserControlller.updateUser
)
router.patch(
  '/:id/password',
  validatorShema(UserSchema.UpdatePassword),
  validatePermission(Permission.UPDATE_USER),
  UserControlller.updateUserPassword
)

router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_USER),
  UserControlller.deleteUser
)

// ** RELATIONSHIPS
router.patch(
  '/:id/roles',
  authRequired,
  validatorShema(UserSchema.Updaterole),
  UserRoleController.updateUserRoles
)

export default router
