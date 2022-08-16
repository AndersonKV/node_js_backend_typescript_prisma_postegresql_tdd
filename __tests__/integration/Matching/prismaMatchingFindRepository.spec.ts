import { MatchingCreateController } from "../../../src/controllers/MatchingController/MatchingCreateController";
import { PrismaMatchingCreateRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingCreateRepository";
import { PrismaMatchingDeleteRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingDeleteRepository";
import { PrismaMatchingFindRepository } from "../../../src/repositories/prisma/matching/PrismaMatchingFindRepository";
import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaMatchingFindRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;
    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaMatchingCreateRepository: PrismaMatchingCreateRepository;
    let prismaMatchingDeleteRepository: PrismaMatchingDeleteRepository;
    let prismaMatchingFindRepository: PrismaMatchingFindRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;
        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaMatchingCreateRepository = new PrismaMatchingCreateRepository;
        prismaMatchingDeleteRepository = new PrismaMatchingDeleteRepository;
        prismaMatchingFindRepository = new PrismaMatchingFindRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });


    it("should apply and find", async () => {
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
        const find = await prismaMatchingFindRepository.findById(apply.id)

        expect(find[0]).toHaveProperty("id")
    });

    it("should fail in find", async () => {
        await expect(prismaMatchingFindRepository.findById(9999)).rejects.toThrow()
    })

    it("should find all by user id", async () => {
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
        const find = await prismaMatchingFindRepository.findByIdUser(apply.id_user)

        expect(find.length).toBeGreaterThan(0)
    });

    it("should find all by job id", async () => {
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
        const find = await prismaMatchingFindRepository.findByIdJob(apply.id_job)

        expect(find.length).toBeGreaterThan(0)
    });


    it("should find all", async () => {
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
        const find = await prismaMatchingFindRepository.findAll()

        expect(find.length).toBeGreaterThanOrEqual(0)
    });


});