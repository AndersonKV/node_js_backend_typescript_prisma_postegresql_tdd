import { prisma } from '../../../prisma';
import { MatchingCreateProps } from '../../../types';
import { IMatchingCreateRepository } from '../../implementations/matching/IMatchingCreateRepository';




class PrismaMatchingCreateRepository implements IMatchingCreateRepository {
    async create({ id_job, id_user, id_author }: MatchingCreateProps) {
        const findIsWhoApply = await prisma.matching.findMany({
            where: {
                id_job,
                id_user,
                id_author
            },
        })

        if (findIsWhoApply.length === 0) {
            return await prisma.matching.create({
                data: {
                    id_job,
                    id_user,
                    id_author
                }
            });
        }

        throw Error("você ja aplicou")

    }
}

export { PrismaMatchingCreateRepository }