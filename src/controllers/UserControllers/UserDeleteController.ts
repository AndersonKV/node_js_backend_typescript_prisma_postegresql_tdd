import { Request, Response } from 'express';
import { PrismaUserDeleteRepository } from '../../repositories/prisma/user/PrismaUserDeleteRepository';


interface RequestProps extends Request {
    id_user?: string;
}

export class UserDeleteController {
    constructor(private prismaUserDeleteRepository: PrismaUserDeleteRepository) {

    }
    async deleteById(req: Request, res: Response) {
        const { id } = req.body;

        try {
            await this.prismaUserDeleteRepository.deleteById(id);
            return res.status(200).json();
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }

    async destroyer(req: Request, res: Response) {

        try {
            await this.prismaUserDeleteRepository.destroyer();
            return res.status(200).json();
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }
};
