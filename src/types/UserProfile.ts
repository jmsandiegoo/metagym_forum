export default interface UserProfile {
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
    interests: any
}