import { Job, Prisma } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../prisma';
import { TypeJob } from '../../../types';
import { UtilsDate } from '../../../util';
import { IJobFindRepository } from '../../implementations/job/IJobFindRepository';





interface typeDateCaledar {
    day: number;
    month: number;
    year: number;
}

class PrismaJobFindRepository implements IJobFindRepository {

    async exist(id: number) {
        const find = await prisma.job.findUnique({
            where: {
                id: id
            }
        });

        if (!find?.id) {
            throw new Error("id do job não foi encontrado: " + id)
        }

        return find;

    }

    async checkIsAuthorApply(id: number, id_user: number) {
        const find = await prisma.job.findMany({
            where: {
                id: id,
                id_user: id_user,
            },
        });


        if (find.length) {
            throw new Error("você não pode aplicar a essa vaga")
        }


    }

    async findById(id: number) {
        const find = await prisma.job.findUnique({
            where: {
                id
            }
        });

        if (!find) {
            throw Error("id da vaga não encontrado, id:" + id);
        }

        return find;

    }
    async findByIdUser(id: number) {
        const find = await prisma.job.findMany({
            where: {
                id_user: id
            }
        });

        if (!find.length) {
            throw new Error("id não encontrado " + id);
        }

        return find;
    }

    async findTheLastThreeJobs() {
        return await prisma.job.findMany({
            orderBy: {
                created_at: "desc"
            },
            take: 3
        })
    }
    async findAll() {
        return await prisma.job.findMany({
            orderBy: { id: 'desc' }
        })
    }

    async findByTech(tech: string, remote: string, experience_level: string, types_contract: string, size_company: string) {
        const conditional = Object.assign({}, tech && { techs: { hasSome: tech } },
            remote && { remote }, experience_level && { experience_level }, types_contract && { types_contract }, size_company && { size_company })


        if (!Object.values(conditional).length) {
            return [];
        }

        const result = await prisma.job.findMany({
            where: conditional
        });

        return result;
    }

}

export { PrismaJobFindRepository }