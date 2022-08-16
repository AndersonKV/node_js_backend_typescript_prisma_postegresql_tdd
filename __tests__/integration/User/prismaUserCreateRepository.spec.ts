import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaUserCreateRepository", () => {

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


    it("should create user", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user);
        expect(create).toHaveProperty("id")
    });


    it("should fail in create user with same email", async () => {
        const user = new userFactory().create();
        await prismaUserCreateRepository.create(user);
        await expect(prismaUserCreateRepository.create(user)).rejects.toThrow()
    });



});