import { Request, Response } from 'express';
import { PrismaMatchingFindRepository } from '../../repositories/prisma/matching/PrismaMatchingFindRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';


interface RequestProps extends Request {
    id_user?: string;
}
export class MatchingFindController {
    constructor(
        private prismaMatchingFindRepository: PrismaMatchingFindRepository,
        private prismaUserFindRepository: PrismaUserFindRepository,
    ) {

    }

    async findById(req: RequestProps, res: Response) {
        const { id } = req.query;
        const id_user = req.id_user

        try {
            await this.prismaUserFindRepository.exist(Number(id_user));

            const find = await this.prismaMatchingFindRepository.findById(Number(id));

            return res.status(200).json({ success: true, data: find });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findByUserId(req: RequestProps, res: Response) {
        const id_user = req.id_user;

        try {

            await this.prismaUserFindRepository.exist(Number(id_user));
            const find = await this.prismaMatchingFindRepository.findByIdUser(Number(id_user));
            return res.status(200).json({ data: '' });
        } catch (error: any) {
            return res.status(400).json({
                error: {
                    message: error.message
                }
            });
        }
    }

    async findByJobId(req: RequestProps, res: Response) {
        const { id_job, id_user } = req.body

        try {
            const find = await this.prismaMatchingFindRepository.findByIdJob(id_job);
            return res.status(200).json({ success: true, data: find });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findAll(req: RequestProps, res: Response) {
        const { id_user } = req.query

        try {

            //await this.prismaUserFindRepository.exist(Number(id_user));

            const find = await this.prismaMatchingFindRepository.findAll();
            return res.status(200).json({ find });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findByIdUser(req: RequestProps, res: Response) {
        const { id_user } = req.query;

        try {

            const data = await this.prismaMatchingFindRepository.findByIdUser(Number(id_user));

            return res.status(200).json({ success: true, data });
        } catch (error) {
            return res.status(400).json({ success: false, error });
        }
    }
}