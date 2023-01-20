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
    profile: UserProfile,
    threads: Thread[] | null,
    comments: Comment[] | null,
    likedThreads: Thread[] | null,
    dislikedThreads: Thread[] | null,
    likedComments: Comment[] | null,
    dislikedComments: Comment[] | null,
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

export interface Thread {
    threadId: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date;
    userId: string;
    user: User;
    comments: Comment[] | null;
    interests: Interest[];
    usersLiked: User[] | null;
    usersDisliked: User[] | null;
}

export interface Comment {
    commentId: string;
    body: string;
    createdAt: Date,
    updatedAt: Date,
    threadId: string,
    userId: string,
    thread: Thread,
    user: User,
    usersLiked: User[],
    usersDisliked: User[]
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

export type OnboardRequest = Pick<UserProfile, "pfpUrl" | "bio" | "experience" | "country" | "height" | "weight" | "age"> & {
    interests: string[]
}

export interface ThreadRequest {
    threadId?: string;
    title: string;
    body: string;
    interests: string[];
}

export interface VoteRequest {
    threadId: string;
    commentId?: string;
    flag: boolean;
}

export interface SearchRequest {
    interests: string[]; 
    title: "";
}


//////////////////////
// Response
//////////////////////

export interface UserResponse {
    user: User;
}

export interface UserJwtResponse {
    jwt: string;
    user: User;
}

export interface UserProfileResponse {
    profile: UserProfile;
}

export interface InterestsResponse {
    interests: Interest[];
}

export interface ThreadResponse {
    thread: Thread;
}

export interface SearchThreadResponse {
    result: Thread[];
}

//////////////////////
// Others
//////////////////////
export type CountryType = { phone: string } & OptionType
export interface OptionType {
    label: string;
    value: string;
    suggested?: boolean;
  }

export interface FeedbackData {
    type: "success" | "error" | "warning";
    message: string;
}