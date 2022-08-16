import { User } from '@prisma/client';
import { prisma } from '../../../prisma';
import { RoleUserValidProps } from '../../../types';
import { IUserFindRepository } from '../../implementations/user/IUserFindRepository';




class PrismaUserFindRepository implements IUserFindRepository {
    findByEmail(email: string): Promise<User[]> {
        throw new Error('Method not implemented.');
    }

    async exist(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });


        if (!user?.id) {
            throw Error("Usuario não registrado");
        }

        return user;
    }



    async existEmail(email: string) {
        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        });

        if (user[0]?.id) {
            throw new Error("email já esta em uso")
        }
    }

    async findById(id: number) {
        const findById = await prisma.user.findUnique({
            where:
            {
                id: id

            }
        });

        if (!findById?.id) {
            throw Error("id não encontrado: " + id)
        }

        return findById
    }

    async findAll() {
        return await prisma.user.findMany({})
    }
}

export { PrismaUserFindRepository }