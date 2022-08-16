import { User } from "@prisma/client";


export interface IUserFindRepository {
    exist(id: number): Promise<User>;
    findByEmail(email: string): Promise<User[]>;
    existEmail(email: string): Promise<void>;
    findById(id: number): Promise<User>;
    findAll(): Promise<User[]>;
}