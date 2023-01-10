import User from "./User";

export interface UserResponse {
    user: User
}

export interface UserJwtResponse {
    jwt: string;
    user: User;
}