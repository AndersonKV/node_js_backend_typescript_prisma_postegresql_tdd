import { Request, Response } from 'express';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';

import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { UtilsUser } from '../../util';
import { PrismaMatchingDeleteRepository } from '../../repositories/prisma/matching/PrismaMatchingDeleteRepository';

interface RequestProps extends Request {
    id_user?: string;
}

export class MatchingDeleteController {

    constructor(
        private prismaUserFindRepository: PrismaUserFindRepository,
        private prismaJobFindRepository: PrismaJobFindRepository,
        private prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository,
        private utilsUser: UtilsUser
    ) {

    }
    async deleteById(req: RequestProps, res: Response) {
        const { id_job, id_apply } = req.body;
        const id_user = req.id_user;


        try {
            const findJob = await this.prismaJobFindRepository.exist(id_job);

            const user = await this.prismaUserFindRepository.exist(Number(id_user));


            await this.prismaMatchingDeleteRepository.deleteById(Number(id_user), id_job, id_apply, findJob.id_user);

            return res.status(200).json();
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }
    async destroyer(req: RequestProps, res: Response) {

        try {
            await this.prismaMatchingDeleteRepository.destroyer()

            return res.status(200).json({ success: true });
        } catch (error: any) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
}