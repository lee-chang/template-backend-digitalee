import z from 'zod'
import { keysPermissions } from '../interfaces/permissions'

// Hacer uso de la interfaz IUser
const roleSchema = z.object({
  name: z.string(),
  description: z.string(),
  permissions: z
    .array(
      z.string().refine((value) => keysPermissions.includes(value), {
        message: 'PERMISSION NOT VALID',
      })
    )
    .optional(),
  by: z.string(),
  tags: z.array(z.string()).optional(),
  users: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  requires2FA: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const RoleSchema = {
  Create: roleSchema,
  Update: roleSchema.pick({ name: true }),
  UpdatePermissions: roleSchema.pick({ permissions: true }),
}
