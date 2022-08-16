import { Request, Response } from 'express';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import bcryptjs from 'bcryptjs'


export class UserFindController {
    constructor(private prismaUserFindRepository: PrismaUserFindRepository) {

    }
    async findById(req: Request, res: Response) {
        const { id } = req.query;

        try {

            const user = await this.prismaUserFindRepository.findById(Number(id));
            return res.status(200).json({ success: true, data: user });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const users = await this.prismaUserFindRepository.findAll();

            return res.status(200).json({ data: users });
        } catch (err: any) {
            return res.status(400).json({
                error: { message: err.message }
            });
        }
    }

};