// **  Scrip para crear los roles en la base de datos (SuperAdmin, Admin, Customer) **

import { IRole } from '../features/role/interfaces/role.interface'
import { AuthUserService } from '../features/auth/user/services/auth-user.service'
import { UserRoleService } from '../features/user/services/user-role.service'
import { UserService } from '../features/user/services/user.service'
import { RoleRepository } from '../features/role/repositories/role.repository'
import { IAuthCredentials } from '../features/auth/interfaces/auth.interface'
import {
  IdentificationType,
  TypePersonEnum,
} from '../features/shared/interfaces/person.interface'
import { AuthCustomerService } from '../features/auth/customer/services/auth-customer.service'
import { CustomerRoleService } from '../features/customer/services/customer-role.service'
import { ICustomer } from '../features/customer/interfaces/customer.interface'
import { CustomerService } from '../features/customer/services/customer.service'

const roleRepository = new RoleRepository()

// ** Create First User SuperAdmin **
const userSuperAdmin: IAuthCredentials = {
  email: 'digitalee@admin.com',
  password: 'Digitalee1',
  userName: 'SuperAdmin',
}

const userCustomer: ICustomer = {
  id: '',
  email: 'digitalee@client.com',
  password: 'Digitalee1',
  userName: 'Lee Digi',
  firstName: 'Lee',
  lastName: 'Digi',
  identificationType: IdentificationType.dni,
  identification: '123456789',
  verified: true,
  role: [],
}

// ** Template Role SuperAdmin && Customer**

const roleSuperAdmin: IRole = {
  id: '', // -> Se crea automaticamente
  name: 'SuperAdmin',
  permissions: ['ALL_PERMISSIONS'],
  by: TypePersonEnum.user,
  users: [],
  description: 'Super Admin role',
  isActive: true,
}
const roleCustomer: IRole = {
  id: '',
  name: 'Customer',
  permissions: ['DELETE_YOUR_USER', 'UPDATE_YOUR_USER', 'READ_YOUR_USER'],
  by: TypePersonEnum.customer,
  users: [],
  description: 'Customer role',
  isActive: true,
}

//Setup SuperAdmin

const superadminSetup = async () => {
  try {
    const isUserSuperAdminDefault = await UserService.isUserExistWithEmail(
      userSuperAdmin.email
    )

    const isSuperAdmin = await roleRepository.findRoleByName('SuperAdmin')

    // Case 1 Existe el SuperAdmin por defecto

    if (isUserSuperAdminDefault) {
      console.log('---- USER SUPERADMIN DEFAULT ALREADY EXIST ----')
      console.log(
        '---- IF YOU DO NOT HAVE SUPER ADMIN ACCESS, DELETE THE USER DEFAULT FROM DB  ----'
      )
      return
    }

    // Case 2 Existe el rol SuperAdmin
    // Tiene usuarios el rol SuperAdmin
    if (isSuperAdmin && isSuperAdmin.users.length > 0) {
      console.log('SuperAdmin role already have users')
      return
    }

    // Case 3 No tiene usuarios el rol SuperAdmin, crear usuario y asignar rol

    if (isSuperAdmin && isSuperAdmin.users.length < 1) {
      await createSuperAdminDefault(isSuperAdmin.id)
    }

    // Case 4 No existe el rol SuperAdmin, crear rol y usuario
    if (!isSuperAdmin) {
      await createUserAndRoleSuperAdminDefault()
    }

    // Tiene usuarios?
    if (isSuperAdmin) {
      await createSuperAdminDefault(isSuperAdmin.id)
    }
  } catch (error) {
    console.log(error)
  }
}

async function createSuperAdminDefault(idSuperAdmin: string) {
  try {
    console.log('Creating SuperAdmin user ...')
    const user = await AuthUserService.createUser(userSuperAdmin)
    console.log('✅ SuperAdmin user created.')

    // Asignar rol
    console.log('Assigning SuperAdmin role ...')
    const assignRole = await UserRoleService.updateUserRolesById(user.user.id, [
      idSuperAdmin,
    ])
    console.log('✅ SuperAdmin role assigned.')

    console.log('SuperAmin:', assignRole, user)
    return
  } catch (error) {
    console.log(error)
  }
}

async function createUserAndRoleSuperAdminDefault() {
  try {
    console.log('Creating new user ...')
    const user = await AuthUserService.createUser(userSuperAdmin)
    console.log('✅ SuperAdmin user created.')

    console.log('Creating SuperAdmin role ...')
    const role = await roleRepository.createRole(roleSuperAdmin)
    console.log('✅ SuperAdmin role created.')

    if (!role) {
      console.log('❌ SuperAdmin role not created')
      return
    }

    // Asignar rol
    console.log('Assigning SuperAdmin role ...')
    const assignRole = await UserRoleService.updateUserRolesById(user.user.id, [
      role.id,
    ])
    console.log('✅✅ SuperAdmin role assigned.')

    console.log('SuperAmin:', assignRole)
    return
  } catch (error) {
    console.log(error)
  }
}

// Setup Customer

const customerSetup = async () => {
  try {
    const isUserCustomerDefault = await CustomerService.isCustomerExistWithEmail(
      userCustomer.email
    )

    const isRoleNameCustomer = await roleRepository.findRoleByName('Customer')

    // Case 1 Existe el SuperAdmin por defecto

    if (isUserCustomerDefault) {
      console.log('---- USER CUSTOMER DEFAULT ALREADY EXIST ----')
      console.log(
        '---- IF YOU DO NOT HAVE CUSTOMER ACCESS, DELETE THE USER DEFAULT FROM DB  ----'
      )
      return
    }

    // Case 2 Existe el rol SuperAdmin
    // Tiene usuarios el rol SuperAdmin
    if (isRoleNameCustomer && isRoleNameCustomer.users.length > 0) {
      console.log('Customer role already have users')
      return
    }

    // Case 3 No tiene usuarios el rol SuperAdmin, crear usuario y asignar rol

    if (isRoleNameCustomer && isRoleNameCustomer.users.length < 1) {
      await createCustomerDefault(isRoleNameCustomer.id)
    }

    // Case 4 No existe el rol SuperAdmin, crear rol y usuario
    if (!isRoleNameCustomer) {
      await createUserAndRoleCustomerDefault()
    }

    // Tiene usuarios?
    if (isRoleNameCustomer) {
      await createCustomerDefault(isRoleNameCustomer.id)
    }
  } catch (error) {
    console.log(error)
  }
}

async function createCustomerDefault(idCustomer: string) {
  try {
    console.log('Creating Customer user ...')
    const user = await AuthCustomerService.createCustomer(userCustomer)
    console.log('✅ Customer user created.')

    // Asignar rol
    console.log('Assigning Customer role ...')
    const assignRole = await CustomerRoleService.updateCustomerRolesById(
      user.user.id,
      [idCustomer]
    )
    console.log('✅ Customer role assigned.')

    console.log('Customer:', assignRole, user)
    return
  } catch (error) {
    console.log(error)
  }
}

async function createUserAndRoleCustomerDefault() {
  try {
    console.log('Creating new user ...')
    const user = await AuthCustomerService.createCustomer(userCustomer)
    console.log('✅ Customer user created.')

    console.log('Creating Customer role ...')
    const role = await roleRepository.createRole(roleCustomer)
    console.log('✅ Customer role created.')

    if (!role) {
      console.log('❌ Customer role not created')
      return
    }

    // Asignar rol
    console.log('Assigning Customer role ...')
    const assignRole = await CustomerRoleService.updateCustomerRolesById(
      user.user.id,
      [role.id]
    )
    console.log('✅✅ Customer role assigned.')

    console.log('Customer:', assignRole)
    return
  } catch (error) {
    console.log(error)
  }
}

export default function setupInitial() {
  superadminSetup()
  customerSetup()
}
