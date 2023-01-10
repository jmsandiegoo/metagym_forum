//////////////////////
// Models
//////////////////////

export interface User {
    userId: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    isVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
    profile: UserProfile
}

export interface UserProfile {
    userProfileId: string,
    rep: number,
    pfpUrl: string,
    bio: string,
    experience: "beginner" | "intermediate" | "expert",
    country: string,
    height: number,
    weight: number,
    age: number,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    interests: Interest[]
}

export interface Interest {
    interestId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    UserProfiles: UserProfile[]
}

//////////////////////
// Request
//////////////////////

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignupRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export type OnboardRequest = Omit<UserProfile, "userProfileId" | "interests"> & {
    interests: string[];
}

//////////////////////
// Response
//////////////////////

export interface UserResponse {
    user: User
}

export interface UserJwtResponse {
    jwt: string;
    user: User;
}

export interface UserProfileResponse {
    profile: UserProfile
}