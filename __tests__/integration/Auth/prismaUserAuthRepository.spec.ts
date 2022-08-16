import { PrismaAuthRepository } from "../../../src/repositories/prisma/auth/PrismaAuthRepository";
import { PrismaJobCreateRepository } from "../../../src/repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaJobDeleteRepositry } from "../../../src/repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserValidProps } from "../../../src/types";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaAuthRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;
    let prismaJobCreateRepository: PrismaJobCreateRepository;
    let prismaJobDeleteRepositry: PrismaJobDeleteRepositry;
    let prismaAuthRepository: PrismaAuthRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;
        prismaJobCreateRepository = new PrismaJobCreateRepository;
        prismaJobDeleteRepositry = new PrismaJobDeleteRepositry;
        prismaAuthRepository = new PrismaAuthRepository;

    });

    afterAll(async () => {
        await prismaJobDeleteRepositry.destroyer().then(async _ => {
            await prismaUserDeleteRepository.destroyer();
        })
    });


    it("should auth", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);
        const sign_in = await prismaAuthRepository.sign_in(create.email)

        expect(sign_in[0]).toHaveProperty("id")
    });

    it("should fail auth with wrong email", async () => {

        await expect(prismaAuthRepository.sign_in("pemail@gmail.com")).rejects.toThrow()
    });

    it("should auth by token", async () => {
        const user = new userFactory().create();

        const create = await prismaUserCreateRepository.create(user);
        const sign_in = await prismaAuthRepository.sign_in(create.email)
        const auth = await prismaAuthRepository.authByToken(sign_in[0].id)

        expect(auth).toHaveProperty("id")
    });

    it("should fail in auth by token", async () => {
        await expect(prismaAuthRepository.authByToken(99999)).rejects.toThrow()
    });



});