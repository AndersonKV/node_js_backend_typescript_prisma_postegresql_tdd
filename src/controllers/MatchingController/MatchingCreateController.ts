import { Request, Response } from 'express';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';
import { PrismaMatchingCreateRepository } from '../../repositories/prisma/matching/PrismaMatchingCreateRepository';
import { PrismaMatchingFindRepository } from '../../repositories/prisma/matching/PrismaMatchingFindRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { UtilsDate, UtilsUser } from '../../util';


interface RequestProps extends Request {
    id_user?: string;
}
export class MatchingCreateController {
    constructor(
        private prismaUserFindRepository: PrismaUserFindRepository,
        private prismaJobFindRepository: PrismaJobFindRepository,
        private prismaMatchingCreateRepository: PrismaMatchingCreateRepository,
        private prismaMatchingFindRepository: PrismaMatchingFindRepository,
        private utilsUser: UtilsUser,
        private utilsDate: UtilsDate) {

    }
    async create(req: RequestProps, res: Response) {
        const { id_job } = req.body;
        const id_user = Number(req.id_user);


        try {
            const user = await this.prismaUserFindRepository.exist(id_user);

            this.utilsUser.checkRoleUser(user.role)

            const findAuthorJob = await this.prismaJobFindRepository.exist(id_job);

            // if (findAuthorJob.id_user === id_user) {
            //     return res.status(400).json({ error: "você não pode aplicar na vaga que você mesmo postou" });
            // }

            const expired = await this.utilsDate.dataHasExpired(findAuthorJob.created_at, Number(findAuthorJob.expired_days));

            await this.prismaJobFindRepository.checkIsAuthorApply(findAuthorJob.id, id_user);

            const id_author = findAuthorJob.id_user;

            const apply = await this.prismaMatchingCreateRepository.create({ id_job, id_user, id_author })

            return res.status(201).json({ data: apply });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }
}