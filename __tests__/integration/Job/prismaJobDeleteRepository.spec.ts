import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaJobFindRepository } from "../../../src/repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaJobDeleteRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;
    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaJobFindRepository: PrismaJobFindRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;
        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaJobFindRepository = new PrismaJobFindRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();

    });


    it("should create user and job and delete", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const del = await prismaJobDeleteRepositry.deleteById(createJob.id, createJob.id_user)
        expect(del).toBe(undefined)
    });


    it("should fail in delete job", async () => {
        await expect(prismaJobDeleteRepositry.deleteById(99999, 9999)).rejects.toThrow()
    });


    it("should fail in destroyer job", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        await prismaJobCreateRepository.create(job)
        await prismaJobDeleteRepositry.destroyer();

        const del = await prismaJobDeleteRepositry.destroyer();
        expect(del).toBe(undefined)

    });









});