export type UserRole = "admin" | "operator";

export interface AuthenticatedUser {
  uuid: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthenticationTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginResponseData {
  user: AuthenticatedUser;
  tokens: AuthenticationTokens;
}

export interface RefreshResponseData {
  user: AuthenticatedUser;
  tokens: AuthenticationTokens;
}

export interface AuthenticatedSession {
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
}
