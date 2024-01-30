import z, { Schema } from 'zod'
import { ICustomer } from '../interfaces/customer.interface'

import { addressSchema } from '../../shared/schemas/address.schema'
import { phoneSchema } from '../../shared/schemas/phone.schema'

// Hacer uso de la interfaz IUser

const roleSchema = z.array((z.string()))
const passwordSchema = z.string().min(3).max(255)


const customerSchema = z.object({
  userName: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  password: passwordSchema,
  verified: z.boolean().optional(),
  fullName: z.string().min(3).max(255).optional(),
  login_code: z.string().min(3).max(255).optional(),
  phone: z.array(phoneSchema).optional(),
  address: z.array(addressSchema).optional(),
  role: roleSchema.optional(), 
})


export const CustomerSchema = {
  Create: customerSchema,
  Update: customerSchema.omit({ password: true, role: true }).partial(),
  Updaterole: customerSchema.pick({ role: true }),
  UpdatePassword: customerSchema.pick({ password: true }),
}
