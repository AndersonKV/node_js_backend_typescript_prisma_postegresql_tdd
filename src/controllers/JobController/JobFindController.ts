import { Request, Response } from 'express';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';
import { UtilsDate } from '../../util';

interface RequestProps extends Request {
    id_user?: string;
}
export class JobFindController {
    constructor(private prismaJobFindRepository: PrismaJobFindRepository,
        private utilsDate: UtilsDate) {

    }
    async findById(req: Request, res: Response) {
        const { id } = req.query;

        try {

            // console.log(req.body)
            // console.log(req.query)
            // console.log(req.params)

            const find = await this.prismaJobFindRepository.findById(Number(id));

            const expired = await this.utilsDate.dataHasExpired(find.created_at, Number(find.expired_days))

            const data = {
                ...find,
                expired
            }
            return res.status(200).json({ data });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findByUserId(req: RequestProps, res: Response) {
        const id_user = Number(req.id_user)


        try {

            const find = await this.prismaJobFindRepository.findByIdUser(Number(id_user));

            return res.status(200).json({ data: find });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }

    async findTheLastThreeJobs(req: Request, res: Response) {
        try {

            const find = await this.prismaJobFindRepository.findTheLastThreeJobs();

            return res.status(200).json({ success: true, data: find });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }


    async findAll(req: Request, res: Response) {
        try {

            const find = await this.prismaJobFindRepository.findAll();

            const setData: any = [];

            find.map(async job => {
                const checkedIspired = await this.utilsDate.dataHasExpired(job.created_at, Number(job.expired_days))
                setData.push({
                    ...job,
                    expired: checkedIspired
                });
            })

            const data = await Promise.resolve(setData)

            return res.status(200).json({ success: true, data: data });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findByTech(req: Request, res: Response) {
        const { remote = '',
            tech = '',
            experience_level = '',
            types_contract = '',
            size_company = ''
        } = req.query;



        try {
            const find = await this.prismaJobFindRepository.findByTech(String(tech).toLowerCase(), String(remote), String(experience_level), String(types_contract), String(size_company))
            return res.status(200).json({ data: find });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }




};
