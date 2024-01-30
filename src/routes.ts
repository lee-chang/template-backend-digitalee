import { Router } from 'express'
import { RouterPath } from './core/service/loggerRouter.service'

import CustomerRouter from './features/customer/routes/customer.route'
import AuthCustomerRouter from './features/auth/customer/routes/auth.route'
import AuthUserRouter from './features/auth/user/routes/auth.route'
import RoleRouter from './features/role/routes/role.route'
import PermissionRouter from './features/role/routes/permission.route'

const route = new RouterPath()

const router = Router()

router.use(route.getApiPath('customer'), CustomerRouter)
router.use(route.getApiPath('user'), CustomerRouter)
router.use(route.getApiPath('auth/customer'), AuthCustomerRouter)
router.use(route.getApiPath('auth/user'), AuthUserRouter)
router.use(route.getApiPath('role'), RoleRouter)
router.use(route.getApiPath('permission'), PermissionRouter)

//Rutas para el Ecommerce


export default router
