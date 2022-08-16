import { Request, Response } from 'express';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { PrismaUserCreateRepository } from '../../repositories/prisma/user/PrismaUserCreateRepository';
import { AuthValidation } from '../../util/AuthValidation';
import { UserValidProps } from '../../types';
import { UserValidation } from '../../util/users/UserValidation';
import { UtilsDate, UtilsJob, UtilsUser } from '../../util';
import crypto from 'crypto';




export class UserCreateController {
    constructor(
        private prismaUserCreateRepository: PrismaUserCreateRepository,
        private prismaUserFindRepository: PrismaUserFindRepository,
        private userValidation: UserValidation,
        private utilsUser: UtilsUser) {
    }

    async create(req: Request, res: Response) {
        const {
            email = '',
            password = '',
            name = '',
            confirm_password = '',
            token = '',
            role = ''
        } = req.body;


        try {
            const data = {
                email,
                password: String(password),
                confirm_password: String(confirm_password),
                name,
                token,
                role
            };


            const validation = await this.userValidation.pass(data);

            if (Object.values(validation).length) {
                return res.status(400).json({ error: validation });
            }

            await this.prismaUserFindRepository.existEmail(data.email)

            data.password = await this.utilsUser.encodedPassword(data.password);
            data.confirm_password = await this.utilsUser.encodedPassword(data.confirm_password);;

            const create = await this.prismaUserCreateRepository.create(data);
            return res.status(201).json({ data: create });
        } catch (error: any) {
            return res.status(400).json({
                error: {
                    message: error.message
                }
            });
        }
    }
}

