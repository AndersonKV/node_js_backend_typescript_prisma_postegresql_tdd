import { Prisma } from '@prisma/client';


export interface IMatchingDeleteRepository {
    deleteById(id_user: number, id_job: number, id_apply: number, id_author: number): Promise<Prisma.BatchPayload>
    destroyer(): Promise<void>
}

