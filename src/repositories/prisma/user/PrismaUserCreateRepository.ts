import { Role } from '@prisma/client';
import { prisma } from '../../../prisma';
import { RoleUserValidProps, UserValidProps } from '../../../types';
import { IUserCreateRepository } from '../../implementations/user/IUserCreateRepository';



class PrismaUserCreateRepository implements IUserCreateRepository {
    async create({ confirm_password, email, name, password, role }: UserValidProps) {

        return await prisma.user.create({
            data: {
                name,
                email,
                password,
                confirm_password,
                avatar: 'user_default.png',
                created_at: new Date(),
                updated_at: new Date(),
                role: role
            }
        })

    }

}

export { PrismaUserCreateRepository }