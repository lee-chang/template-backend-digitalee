import { CustomerControlller } from '../controllers/customer.controller'
// import { validatePermission } from '../../../core/middlewares/validatePermission'
import { Router } from 'express'
import { CustomerRoleController } from '../controllers/customer-role.controller'

import { authRequired } from '../../../core/middleware/validateToken.middleware'
import { validatorShema } from '../../../core/middleware/validateSchema.middleware'
import { CustomerSchema } from '../schemas/customer.schema'

const router = Router()

// ** CRUD
router.get('/', authRequired, CustomerControlller.getCustomers)
router.get('/:id', authRequired, CustomerControlller.getCustomer)
router.post('/', authRequired, CustomerControlller.createCustomer)
router.delete('/:id', authRequired, CustomerControlller.deleteCustomer)
router.patch(
  '/:id',
  authRequired,
  validatorShema(CustomerSchema.Update),
  CustomerControlller.updateCustomer
)
router.patch(
  '/:id/password',
  validatorShema(CustomerSchema.UpdatePassword),
  CustomerControlller.updateCustomerPassword
)

// ** RELATIONSHIPS
router.patch(
  '/:id/roles',
  authRequired,
  validatorShema(CustomerSchema.Updaterole),
  CustomerRoleController.updateCustomerRoles
)

export default router
