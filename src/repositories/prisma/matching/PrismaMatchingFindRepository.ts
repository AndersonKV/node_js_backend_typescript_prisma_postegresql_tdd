import { prisma } from '../../../prisma';
import { IMatchingFindRepository } from '../../implementations/matching/IMatchingFindRepository';


class PrismaMatchingFindRepository implements IMatchingFindRepository {

    async isMatching(id_user: number, id_job: number) {
        const find = await prisma.matching.findMany({
            where: {
                id_job,
                id_user
            }
        });

        return find.length ? true : false

    }

    async getAllMatchings(id_user: number) {
        return await prisma.matching.findMany({
            where: {
                id_user
            }
        });


    }


    async findById(id: number) {
        const find = await prisma.matching.findMany({
            where: {
                id: id
            }
        });

        if (!find.length) {
            throw Error("id não encontrado " + id);
        }
        return find;
    }

    async findByIdUser(id: number) {
        return await prisma.matching.findMany({
            where: {
                id_user: id
            }
        });
    }

    async findByIdJob(id_job: number) {


        const find = await prisma.matching.findMany({
            where: {
                id_job
            }
        });


        if (!find.length) {
            throw Error("id não encontrado");
        }

        return find;
    }

    async findAll() {
        const applys = await prisma.matching.findMany({});


        if (!applys.length) {
            throw Error("não há registro para ser deletado");
        }

        return applys

    }
}

export { PrismaMatchingFindRepository }