export interface TokenPayload {
  sub: string;  // user id
  role: string; // role từ backend
  exp: number;  // expiry
}

