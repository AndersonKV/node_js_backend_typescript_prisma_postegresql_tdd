import { Job } from "@prisma/client";

export interface IJobFindRepository {
    exist(id: number): Promise<Job>;
    checkIsAuthorApply(id: number, id_user: number): Promise<void>;
    findById(id: number): Promise<Job>;
    findByIdUser(id: number): Promise<Job[]>;
    findAll(): Promise<Job[]>;
    findTheLastThreeJobs(): Promise<Job[]>;
    findByTech(tech: string, remote: string, experience_level: string, types_contract: string, size_company: string): Promise<Job[]>
}