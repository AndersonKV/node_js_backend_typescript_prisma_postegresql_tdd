import { MatchingCreateController } from "../../../src/controllers/MatchingController/MatchingCreateController";
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

describe("[integration] - prismaMatchingCreateRepository", () => {

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


    it("should apply", async () => {
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

        expect(apply).toHaveProperty("id")
    });


    it("should fail in apply with id_job", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: 9999,
            id_user: create.id,
            id_author: createJob.id_user

        }


        await expect(prismaMatchingCreateRepository.create(data)).rejects.toThrow()
    });

    it("should fail in apply with id_user", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const data = {
            id_job: createJob.id,
            id_user: 9999,
            id_author: 999

        }


        await expect(prismaMatchingCreateRepository.create(data)).rejects.toThrow()
    });



});