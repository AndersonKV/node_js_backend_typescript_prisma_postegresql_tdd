import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaJobFindRepository } from "../../../src/repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaJobFindRepository", () => {

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


    it("should create user and job and find by id", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const find = await prismaUserFindRepository.findById(create.id);

        expect(find).toHaveProperty("id")
    });

    it("should create user and job and find by user_id", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const find = await prismaJobFindRepository.findByIdUser(createJob.id_user);
        expect(find[0]).toHaveProperty("id")
    });

    it("should fail find by user_id", async () => {
        await expect(prismaJobFindRepository.findById(9999)).rejects.toEqual(
            new Error("id da vaga não encontrado, id:9999")
        );


    });

    it("should verify is exist", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        const createJob = await prismaJobCreateRepository.create(job)

        const find = await prismaJobFindRepository.exist(createJob.id);
        expect(find).toHaveProperty("id")
    });



    it("should fail in verify is exist", async () => {
        await expect(prismaJobFindRepository.exist(99999)).rejects.toThrow()
    });

    it("should find last three jobs", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        await prismaJobCreateRepository.create(job)
        await prismaJobCreateRepository.create(job)
        await prismaJobCreateRepository.create(job)

        const find = await prismaJobFindRepository.findTheLastThreeJobs()

        expect(find.length).toBe(3)
    });

    it("should find by tech", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);

        const job = new jobFactory().create('token', create.id);

        await prismaJobCreateRepository.create(job)
        await prismaJobCreateRepository.create(job)
        await prismaJobCreateRepository.create(job)

        const find = await prismaJobFindRepository.findByTech(
            'ruby',
            'sim',
            'pleno',
            'clt',
            'grande'
        )

        expect(find.length).toBeGreaterThanOrEqual(3)
    });


    it("should fail in find", async () => {
        await expect(prismaUserFindRepository.findById(99999)).rejects.toThrow()
    });

    it("should find all", async () => {

        const find = await prismaUserFindRepository.findAll();

        expect(find.length).toBeGreaterThanOrEqual(0)
    });





});