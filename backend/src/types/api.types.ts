// API Request/Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export interface JwtPayload extends AuthPayload {
  iat: number;
  exp: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
