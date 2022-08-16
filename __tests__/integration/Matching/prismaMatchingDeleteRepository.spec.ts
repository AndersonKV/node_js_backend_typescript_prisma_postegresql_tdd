import { PrismaMatchingCreateRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingCreateRepository";
import { PrismaMatchingDeleteRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingDeleteRepository";
import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaMatchingDeleteRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;
    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaMatchingCreateRepository: PrismaMatchingCreateRepository;
    let prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;
        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaMatchingCreateRepository = new PrismaMatchingCreateRepository;
        prismaMatchingDeleteRepository = new PrismaMatchingDeleteRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();

    });


    it("should apply and delete", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: createJob.id,
            id_user: create.id,
            id_author: createJob.id_user

        }

        const apply = await prismaMatchingCreateRepository.create(data)

        const del = await prismaMatchingDeleteRepository.deleteById(apply.id_user, apply.id_job, apply.id, apply.id_author)

        expect(del.count).toBe(1)
    });

    it("should faill in delete", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: createJob.id,
            id_user: create.id,
            id_author: createJob.id_user

        }

        await prismaMatchingCreateRepository.create(data)


        await expect(prismaMatchingDeleteRepository.deleteById(9999, 9999, 9999, 99)).rejects.toThrow()
    });

    it("should destroyer all ", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: createJob.id,
            id_user: create.id,
            id_author: createJob.id_user

        }

        await prismaMatchingCreateRepository.create(data)
        expect(await prismaMatchingDeleteRepository.destroyer()).toBe(undefined)
    });

    it("should fail in destroyer all ", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: createJob.id,
            id_user: create.id,
            id_author: createJob.id_user

        }

        await prismaMatchingCreateRepository.create(data)
        await prismaMatchingDeleteRepository.destroyer()

        await expect(prismaMatchingDeleteRepository.destroyer()).rejects.toThrow()
    });



});