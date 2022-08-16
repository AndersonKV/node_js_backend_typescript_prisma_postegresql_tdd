import { Request, Response } from 'express';
import { PrismaJobDeleteRepositry } from '../../repositories/prisma/job/PrismaJobDeleteRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';

interface RequestProps extends Request {
    id_user?: string;
}
export class JobDeleteController {
    constructor(private prismaJobDeleteRepositry: PrismaJobDeleteRepositry) {

    }
    async deleteById(req: RequestProps, res: Response) {
        const { id_job, id_user } = req.body;

        try {

            await this.prismaJobDeleteRepositry.deleteById(id_job, id_user);

            return res.status(200).json({ success: true });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async destroyer(req: Request, res: Response) {
        try {
            await this.prismaJobDeleteRepositry.destroyer()
            return res.status(200).json({ success: true });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}