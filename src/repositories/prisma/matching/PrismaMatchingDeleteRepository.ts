import { prisma } from '../../../prisma';
import { IMatchingDeleteRepository } from '../../implementations/matching/IMatchingDeleteRepository';


class PrismaMatchingDeleteRepository implements IMatchingDeleteRepository {


    async deleteById(id_user: number, id_job: number, id_apply: number, id_author: number) {
        const find = await prisma.matching.deleteMany({
            where: {
                id: id_apply,
                id_job,
                id_user,
                id_author
            },
        });

        if (!find.count)
            throw new Error("falha ao deleta");

        return find;

    }

    async destroyer() {
        const applys = await prisma.matching.deleteMany({});

        if (!applys.count) {
            throw Error("Não foi encontrado nenhum dado para ser deletado")
        }
    }
}

export { PrismaMatchingDeleteRepository }