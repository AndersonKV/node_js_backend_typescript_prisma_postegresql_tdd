import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaUserDeleteRepository", () => {

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


    it("should create user and delete", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);
        const del = await prismaUserDeleteRepository.deleteById(create.id);
        expect(del).toBe(undefined)
    });


    it("should faill in delete", async () => {
        await expect(prismaUserDeleteRepository.deleteById(9999)).rejects.toThrow()
    });


    it("should delete all", async () => {
        const user = new userFactory().create();
        await prismaUserCreateRepository.create(user)

        const del = await prismaUserDeleteRepository.destroyer();
        expect(del).toBe(undefined)

    });





});