import UserProfile from "./UserProfile";

export default interface User {
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