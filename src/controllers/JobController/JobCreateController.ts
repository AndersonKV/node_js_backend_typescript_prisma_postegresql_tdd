import { Request, Response } from 'express';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';
import { PrismaJobCreateRepository } from '../../repositories/prisma/job/PrismaJobCreateRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { JobSaveProps } from '../../types';
import { Role } from '@prisma/client';
import { UtilsUser } from '../../util';
import { JobValidation } from '../../util/jobs/JobValidation';

interface RequestProps extends Request {
    id_user?: string;
}

export class JobCreateController {

    constructor(private prismaUserFindRepository: PrismaUserFindRepository,
        private prismaJobCreateRepository: PrismaJobCreateRepository,
        private jobValidation: JobValidation,
        private utilsUser: UtilsUser) { }


    async create(req: RequestProps, res: Response) {
        const id_user = Number(req.id_user)

        const {
            title = '',
            name_company = '',
            remote = '',
            techs = [],
            types_contract = '',
            size_company = '',
            experience_level = '',
            expired_days = '',
            salary = '',
            responsibilities = '',
            requirements = '',
            benefits = '',
        } = req.body;


        const data: JobSaveProps = {
            title,
            name_company,
            remote,
            techs,
            responsibilities,
            requirements,
            types_contract,
            size_company,
            experience_level,
            expired_days,
            salary,
            benefits,
            id_user,
        };

        try {
            const user = await this.prismaUserFindRepository.exist(data.id_user);

            this.utilsUser.checkRoleCompany(user.role)

            const validate = await this.jobValidation.pass(data);

            // console.log(req.body)
            // console.log({ validate })
            if (Object.values(validate).length) {
                return res.status(400).json({
                    error: validate
                });
            }

            const job = await this.prismaJobCreateRepository.create(data);

            return res.status(201).json({ data: job });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            })
        }
    }
};
