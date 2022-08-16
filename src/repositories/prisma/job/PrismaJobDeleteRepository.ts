import { prisma } from '../../../prisma';
import { IJobDeleteRepository } from '../../implementations/job/IJobDeleteRepository';





class PrismaJobDeleteRepositry implements IJobDeleteRepository {
    async deleteById(id: number, id_user: number) {
        const deleteById = await prisma.job.deleteMany({
            where: {
                id: id,
                AND: {
                    id_user
                }
            },
        });

        if (!deleteById.count) {
            throw Error(`não foi apagar o registro, id:${id}, id_user:${id_user}`)
        }

    }

    async destroyer() {
        await prisma.job.deleteMany({});
    }
}

export { PrismaJobDeleteRepositry }