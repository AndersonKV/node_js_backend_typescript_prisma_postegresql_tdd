import { Job, Matching, User } from "@prisma/client";

export interface IAuthRepostiry {
    sign_in(email: string): Promise<User[]>;
    authByToken(id: number): Promise<User>;
    dashboard(id: number): Promise<(User & {
        matchings: {
            matchings: User;
        }[];
        _count: {
            posts: number;
            matchings: number;
        };
    }) | null>;
    findPostsAndMatchings(id: number): Promise<(User & {
        matchings: (Matching & {
            job_posted: Job;
        })[];
        posts: (Job & {
            matchings: Matching[];
        })[];
    }) | null>
}