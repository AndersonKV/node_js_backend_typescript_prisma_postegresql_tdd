import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaUserFindRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });


    it("should create user and find", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);
        const find = await prismaUserFindRepository.findById(create.id);
        expect(find).toHaveProperty("id")
    });


    it("should fail in find", async () => {
        await expect(prismaUserFindRepository.findById(9999)).rejects.toThrow()
    });

    it("should find all", async () => {
        const user = new userFactory().create();
        const user2 = new userFactory().create();
        const user3 = new userFactory().create();

        await prismaUserCreateRepository.create(user);
        await prismaUserCreateRepository.create(user2);
        await prismaUserCreateRepository.create(user3);

        const find = await prismaUserFindRepository.findAll();

        expect(find.length).toBeGreaterThan(3)
    });


});