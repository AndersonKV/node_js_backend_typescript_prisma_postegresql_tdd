import { Request, Response } from 'express';
import { PrismaAuthRepository } from '../../repositories/prisma/auth/PrismaAuthRepository';
import bcryptjs from "bcryptjs";
import { PrismaMatchingFindRepository } from '../../repositories/prisma/matching/PrismaMatchingFindRepository';
import { AuthValidation } from '../../util/AuthValidation';
import { PrismaJobFindRepository } from '../../repositories/prisma/job/PrismaJobFindRepository';
import { UtilsDate, UtilsJob, UtilsUser } from '../../util';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';


interface RequestProps extends Request {
    id_user?: string;
    token?: string;
}
export class UserAuthController {
    constructor(
        private prismaAuthRepository: PrismaAuthRepository,
        private prismaMatchingFindRepository: PrismaMatchingFindRepository,
        private prismaJobFindRepository: PrismaJobFindRepository,
        private prismaUserFindRepository: PrismaUserFindRepository,
        private utilsUser: UtilsUser,
        private utilsDate: UtilsDate,
        private utilsJob: UtilsJob,
        private authValidation: AuthValidation) {
    }

    async sign_in(req: Request, res: Response) {
        const {
            email = '',
            password = ''
        } = req.body;

        const data = { email: String(email).toLowerCase(), password: String(password) };

        try {

            const validation = await this.authValidation.signIn(data);

            if (Object.values(validation).length) {
                return res.status(400).json({ error: validation });
            }


            const user = await this.prismaAuthRepository.sign_in(data.email)


            const compareEncodedPassword = await bcryptjs.compare(data.password, user[0].password);

            if (!compareEncodedPassword) {
                return res.status(400).json({ password: "senha errada" });
            }

            const token = await this.authValidation.setTokenAuth(user[0].id);
            //await setRedis(`user-${user.rows[0].id}`, JSON.stringify(user.rows));

            return res.status(200).json({ success: true, data: user, token });
        } catch (error: any) {
            return res.status(400).json({
                error: {
                    message: error.message
                }
            });
        }
    }

    async authToken(req: RequestProps, res: Response,) {
        const id_user = Number(req.id_user);

        try {

            //const getUserRedis = await getRedis(`user-${id}`);

            // if (getUserRedis) {
            //     const userRedis = JSON.parse(getUserRedis);
            //     return res.status(200).json({ success: true, data: userRedis });
            // }


            const user = await this.prismaAuthRepository.authByToken(id_user)

            return res.status(200).json({ user: user });
        } catch (err: any) {
            return res.status(400).json({
                error: {
                    message: err.message
                }
            });
        }
    }


    async dashboard(req: RequestProps, res: Response) {
        const id_user = Number(req.id_user);
        const token = String(req.token);

        try {
            await this.prismaUserFindRepository.exist(id_user)
            const data = await this.prismaAuthRepository.dashboard(id_user);
            return res.status(200).json({ data, token });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }

    async dashboardOpportunity(req: RequestProps, res: Response) {
        const id_user = Number(req.id_user);
        const token = String(req.token);

        try {
            await this.prismaUserFindRepository.exist(id_user)
            const data = await this.prismaAuthRepository.findPostsAndMatchings(id_user);

            return res.status(200).json({ data, token });
        } catch (err: any) {
            return res.status(400).json({ success: false, error: err.message });
        }
    }
}