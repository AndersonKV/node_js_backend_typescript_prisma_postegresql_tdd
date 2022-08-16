import { Request, Response } from 'express';
import { PrismaMatchingFindRepository } from '../../repositories/prisma/matching/PrismaMatchingFindRepository';
import { PrismaAuthRepository } from '../../repositories/prisma/auth/PrismaAuthRepository';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { UtilsDate } from '../../util';


interface RequestProps extends Request {
    id_user?: string;
}
export class JobAuthController {
    constructor(
        private prismaJobFindRepository: PrismaJobFindRepository,
        private prismaAuthRepository: PrismaAuthRepository,
        private prismaUserFindRepository: PrismaUserFindRepository,
        private prismaMatchingFindRepository: PrismaMatchingFindRepository) {

    }


    async findById(req: RequestProps, res: Response) {
        const { id_job } = req.body;
        const id_user = Number(req.id_user);

        try {

            const findByJobId = await this.prismaJobFindRepository.findById(Number(id_job));

            const findByUserId = await this.prismaUserFindRepository.findById(Number(id_user));

            const isMatching = await this.prismaMatchingFindRepository.isMatching(id_user, Number(findByUserId.id))

            const checkedIspired = await new UtilsDate().dataHasExpired(findByJobId.created_at, Number(findByJobId.expired_days))



            const job = {
                ...findByJobId,
                expired: checkedIspired,
                auth_apply: isMatching
            }

            const arr = []

            arr.push(job)


            return res.status(200).json({ job: arr });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }
    async findAll(req: RequestProps, res: Response) {
        const { id_job } = req.body;
        const id_user = Number(req.id_user);

        try {

            const user = await this.prismaAuthRepository.authByToken(id_user)

            const findAll = await this.prismaJobFindRepository.findAll();

            const setData: any = [];



            // const expired = await this.utilsDate.dataHasExpired(find.created_at, Number(find.expired_days))

            findAll.map(async job => {
                // const checkedIspired = await dataHasExpired(job.created_at, Number(job.expired_days))
                //console.log(job.created_at, daysExpired)
                const checkedIspired = await new UtilsDate().dataHasExpired(job.created_at, Number(job.expired_days))

                setData.push({
                    ...job,
                    expired: checkedIspired
                });
            })


            const data = await Promise.resolve(setData)

            return res.status(200).json({ success: true, job: data, user });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }


};
