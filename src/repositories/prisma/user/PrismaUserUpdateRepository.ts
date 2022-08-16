import { prisma } from '../../../prisma';
import { pool } from '../../../config/database'
import { UserUpdateProps, UserValidProps } from '../../../types';
import { IUserUpdateRepository } from '../../implementations/user/IUserUpdateRepository';




class PrismaUserUpdateRepository implements IUserUpdateRepository {
    async update(data: UserValidProps) {

        return await prisma.user.update({
            where: {
                id: data.id,
            },
            data
        });

    }

}

export { PrismaUserUpdateRepository }