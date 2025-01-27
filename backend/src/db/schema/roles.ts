export enum UserRole {
    GUEST = "GUEST",
    USER = "USER",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export interface RolePermissions {
    [UserRole.GUEST]: string[];
    [UserRole.USER]: string[];
    [UserRole.MODERATOR]: string[];
    [UserRole.ADMIN]: string[];
    [UserRole.SUPER_ADMIN]: string[];
}

export const ROLE_PERMISSIONS: RolePermissions = {
    [UserRole.GUEST]: ["view:public_content"],
    [UserRole.USER]: [
        "view:public_content",
        "create:own_profile",
        "update:own_profile",
    ],
    [UserRole.MODERATOR]: [
        "view:public_content",
        "create:own_profile",
        "update:own_profile",
        "delete:user_content",
        "warn:user",
    ],
    [UserRole.ADMIN]: [
        "view:public_content",
        "create:own_profile",
        "update:own_profile",
        "manage:users",
        "manage:content",
        "ban:user",
    ],
    [UserRole.SUPER_ADMIN]: [
        "view:all_content",
        "create:any_content",
        "update:any_content",
        "delete:any_content",
        "manage:system_settings",
        "manage:roles",
    ],
};

export const hasPermission = (role: UserRole, permission: string): boolean => {
    return ROLE_PERMISSIONS[role].includes(permission);
};

export const isRoleAuthorized = (
    userRole: UserRole,
    requiredRole: UserRole
): boolean => {
    const roleHierarchy = [
        UserRole.GUEST,
        UserRole.USER,
        UserRole.MODERATOR,
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
    ];

    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

    return userRoleIndex >= requiredRoleIndex;
};
