/**
 * Template Permissions
 *
 * Define Action and Entidad // Accion y Entity
 *
 * CREATE_PRODUCT // Crear Producto
 * READ_PRODUCT // Leer Producto
 * UPDATE_PRODUCT // Actualizar Producto
 * DELETE_PRODUCT // Eliminar Producto
 *
 */

enum Permission {

  // ** ALL PERMISSIONS (FOR SUPER ADMIN)
  ALL_PERMISSIONS = 'ALL PERMISSIONS',

  // ** USER MANAGEMENT
  // ROLE
  CREATE_ROLE = 'CREATE ROLE',
  READ_ROLE = 'READ ROLE',
  UPDATE_ROLE = 'UPDATE ROLE',
  DELETE_ROLE = 'DELETE ROLE',

  // USER
  CREATE_USER = 'CREATE USER',
  READ_USER = 'READ USER',
  UPDATE_USER = 'UPDATE USER',
  DELETE_USER = 'DELETE USER',


  // YOUR USER
  READ_YOUR_USER = 'READ YOUR USER',
  UPDATE_YOUR_USER = 'UPDATE YOUR USER',
  DELETE_YOUR_USER = 'DELETE YOUR USER',
}

export interface PermissionObject {
  [key: string]: string
}

export const keysPermissions = Object.keys(Permission)
export type KeyPermissionsType = keyof typeof Permission

export default Permission
