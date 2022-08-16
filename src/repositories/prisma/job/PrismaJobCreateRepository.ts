import { prisma } from '../../../prisma';
import { pool } from '../../../config/database';
import { JobSaveProps, SignInProps } from '../../../types';
import { IJobCreateRepotiry } from '../../implementations/job/IJobCreateRepository';







class PrismaJobCreateRepository implements IJobCreateRepotiry {

    async create({ salary, experience_level, name_company,
        remote, size_company, techs, title, types_contract,
        id_user, expired_days, responsibilities, requirements,
        benefits }: JobSaveProps) {

        // const created_at = await currentDate();
        // const updated_at = created_at;
        const actualDate = new Date();
        //actualDate.setDate(7)


        return await prisma.job.create({
            data: {
                salary,
                experience_level,
                name_company,
                remote,
                size_company,
                title,
                types_contract,
                id_user,
                avatar: "company_default.png",
                expired_days: expired_days.toString(),
                responsibilities,
                requirements,
                benefits,
                techs,
                created_at: actualDate,
                updated_at: new Date()
            }
        });
    }


}

export { PrismaJobCreateRepository }
