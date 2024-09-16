export enum RolesEnum {
  ADMIN = "Admin",
  USER = "User",
}

export const ROLES_KEYS = Object.keys(RolesEnum).map(
  (key) => RolesEnum[key as keyof typeof RolesEnum]
);
