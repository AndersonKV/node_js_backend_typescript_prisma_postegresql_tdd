import { prisma } from '../../../prisma';
import { IUserDeleteRepository } from '../../implementations/user/IUserDeleteRepository';




class PrismaUserDeleteRepository implements IUserDeleteRepository {
    async deleteById(id: number) {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })

        if (!user.id) {
            throw new Error("falha em deletar usuario, id " + id + ' não encontrado')
        }
    }

    async destroyer() {
        const users = await prisma.user.deleteMany({});
    }
}

export { PrismaUserDeleteRepository }