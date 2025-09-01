export interface RegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface RegisterResponse {
    message: string;
}