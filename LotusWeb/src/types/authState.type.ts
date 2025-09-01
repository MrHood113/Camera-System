import type { RoleEnum } from "./roleEnum.type";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  roleEnum: RoleEnum | null;
  id: number | null; 
}