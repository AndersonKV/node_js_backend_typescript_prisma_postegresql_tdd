import { json, Request, Response } from 'express';
import { UserUpdateValidation } from '../../util/users/UserUpdateValidation';
import { RoleUserValidProps, UserValidProps } from '../../types';
import { PrismaUserUpdateRepository } from '../../repositories/prisma/user/PrismaUserUpdateRepository';
import { PrismaUserFindRepository } from '../../repositories/prisma/user/PrismaUserFindRepository';
import { UtilsUser } from '../../util';
import crypto from 'crypto';
import { AuthValidation } from '../../util/AuthValidation';



interface RequestProps extends Request {
    id_user?: string;
    token?: string;

}

export class UserUpdateController {
    constructor(
        private prismaUserUpdateRepository: PrismaUserUpdateRepository,
        private prismaUserFindRepository: PrismaUserFindRepository,
        private userUpdateValidation: UserUpdateValidation,
        private utilsUser: UtilsUser,
        private authValidation: AuthValidation

    ) { }


    async update(req: RequestProps, res: Response) {
        const id_user = Number(req.id_user);
        const token = String(req.token);

        const {
            email = '',
            password = '',
            name = '',
            new_password = '',
            avatar = '',
        } = req.body;


        try {

            const preUpdate = {
                id: id_user,
                email,
                password: String(password),
                new_password: String(new_password),
                name,
                avatar,
            };

            // console.log(req.file)

            if (req.file?.fieldname) {
                preUpdate.avatar = req.file.filename
            }

            const user = await this.prismaUserFindRepository.findById(Number(id_user));

            const validate = await this.userUpdateValidation.update(preUpdate, user)

            // console.log({ validate })

            if (Object.values(validate).length) {
                return res.status(400).json({
                    error: validate
                });
            }

            const data = {
                id: preUpdate.id,
                avatar: preUpdate.avatar,
                name: preUpdate.name,
                email: preUpdate.email,
                password: new_password ? new_password : user.password,
                confirm_password: new_password ? new_password : user.confirm_password,
                role: RoleUserValidProps[user.role],
                created_at: user.created_at,
                updated_at: new Date()
            }

            if (new_password) {
                data.password = await this.utilsUser.encodedPassword(new_password);

                data.confirm_password = await this.utilsUser.encodedPassword(new_password);

            }

            const update = await this.prismaUserUpdateRepository.update(data);

            return res.status(201).json({ data: Array(update), token });
        } catch (error: any) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
}

