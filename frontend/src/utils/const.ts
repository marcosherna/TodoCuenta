
export const END_POINTS = {
    AUTH: {
        LOGIN: "/auth/sign-in",
        LOGOUT: "/auth/logout",
        REGISTER: "/auth/register",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    }, 
    BRANCH: {
        GET: "/administration/branches",
        POST: "/administration/branches",
        PUT: "/administration/branches",
        DELETE: "/administration/branches",
    }, 
    USERS: {
        GET: "/administration/users",
        POST: "/administration/users",
        PUT: "/administration/users",
        DELETE: "/administration/users",
    }, 
    ROLES: {
        GET: "/administration/rol",
        POST: "/administration/rol",
        PUT: "/administration/rol",
        DELETE: "/administration/rol",
    }
}

export const TANSTACK_KEY = {
    GET_BRANCHES: "GET_BRANCHES",
    GET_ROLES: "GET_ROLES",
    GET_USERS: "GET_USERS",
}