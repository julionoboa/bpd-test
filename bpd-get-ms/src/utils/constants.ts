export const HEADERS = {
    AUTH_PREFIX: 'Bearer ',
    API_KEY: 'x-api-key',
    API_SECRET: 'x-api-secret',
    USER_EMAIL: 'x-user-email',
}

export const AUTH = {
    INTERNAL: {
        API_KEY: process.env.INTERNAL_API_KEY,
        API_SECRET: process.env.INTERNAL_API_SECRET,
    },
    PUBLIC: {
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET,
    }
}

export const MESSAGES = {
    ERROR: {
        MISSING_TOKEN: 'Missing or invalid token',
        USER_NOT_FOUND: 'User not found',
        SERVER_ERROR: 'Server error',
        UNAUTHORIZED_ACCESS: 'Unauthorized access to internal route',
        UNAUTHORIZED_PUBLIC_REQUEST: 'Unauthorized public request',
        MISSING_EMAIL_HEADER: 'Missing x-user-email header',
        INVALID_TOKEN: 'Invalid or expired token',
    },
    SUCCESS: {
        USER_FOUND: 'User found',
    }
}

export const ROUTES = {
    INTERNAL: {
        GET_PROFILE: '/internal/get-profile',
    },
    PUBLIC: {
        GET_OWN_PROFILE: '/profile',
    }
}