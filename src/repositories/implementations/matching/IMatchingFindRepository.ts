import { Matching } from "@prisma/client";

export interface IMatchingFindRepository {
    isMatching(id_user: number, id_job: number): Promise<boolean>;
    getAllMatchings(id_user: number): Promise<Matching[]>;
    findById(id: number): Promise<Matching[]>;
    findByIdUser(id: number): Promise<Matching[]>;
    findByIdJob(id_job: number): Promise<Matching[]>;
    findAll(): Promise<Matching[]>;
}