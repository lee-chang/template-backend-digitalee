import Permission, { KeyPermissionsType, PermissionObject } from '../interfaces/permissions'

export class PermissionService {

  static listKeysPermissions(){
    console.log("list keys permissions")
    const permissions = Object.keys(Permission).reduce((acc, key) => {
      acc[key] = Permission[key as KeyPermissionsType]
      return acc
    }, {} as PermissionObject)

    return permissions
  }

}
