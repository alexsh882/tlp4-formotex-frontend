export const ROLES = {
  USER: "User",
  ADMIN: "Admin",
} as const;

export const ROLE_NAMES = Object.values(ROLES);

export type RolesList = (typeof ROLES)[keyof typeof ROLES];
