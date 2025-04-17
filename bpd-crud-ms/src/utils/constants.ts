export const HEADERS = {
    AUTH_PREFIX: 'Bearer ',
    API_KEY: 'x-api-key',
    API_SECRET: 'x-api-secret',
    USER_EMAIL: 'x-user-email',
  };
  
  export const MESSAGES = {
    DEFAULT_ERROR: 'An unexpected error occurred',
    MISSING_TOKEN_ERROR: 'Missing or invalid token',
    INVALID_TOKEN_ERROR: 'Invalid or expired token',
    UNAUTHORIZED_PUBLIC: 'Unauthorized public request',
    UNAUTHORIZED_INTERNAL: 'Unauthorized access to internal route',
    PROFILE_NOT_FOUND: 'Profile not found',
    PROFILE_ALREADY_EXISTS: 'Profile already exists',
    PROFILE_CREATED: 'Profile created successfully',
    PROFILE_DELETED: 'Profile deleted successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    VALIDATION_FAILED: 'Validation failed',
    EMAIL_REQUIRED: 'Email is required',
    CREATING_PROFILE_ERROR: 'Error creating profile',
    DELETING_PROFILE_ERROR: 'Error deleting profile',
    UPDATING_PROFILE_ERROR: 'Error updating profile',
    VERIFYING_TOKEN_ERROR: 'Error verifying token',
    VERIFYING_PROFILE_ERROR: 'Error verifying profile',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    USER_NOT_FOUND_DATABASE: 'User not found in database',
    USER_NOT_FOUND_MS: 'User not found in microservice',
    ERROR_CONTACTING_MS: 'Error contacting microservice',
    
  };

  export const ROUTES = {
    INTERNAL : {
      VERIFY_TOKEN: '/internal/verify-token',
      SAVE_LOGS: '/internal/save-logs',
    },
    PUBLIC: {
      CREATE_PROFILE: '/create-profile',
      DELETE_PROFILE: '/delete-profile',
      UPDATE_PROFILE: '/update-profile',
      GET_LOGS: '/logs'
    }
  };

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

export type LogAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

export const LogActions: Record<LogAction, LogAction> = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};