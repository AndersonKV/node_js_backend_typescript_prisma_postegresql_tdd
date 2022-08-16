import { PrismaUserCreateRepository } from "../../../src/repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserDeleteRepository } from "../../../src/repositories/prisma/user/PrismaUserDeleteRepository";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../../src/repositories/prisma/user/PrismaUserUpdateRepository";
import { UserValidProps } from "../../../src/types";
import { userFactory } from "../../utils/userFactory";

describe("[integration] - prismaUserUpdateRepository", () => {

    let prismaUserCreateRepository: PrismaUserCreateRepository;
    let prismaUserDeleteRepository: PrismaUserDeleteRepository;
    let prismaUserFindRepository: PrismaUserFindRepository;
    let prismaUserUpdateRepository: PrismaUserUpdateRepository;

    beforeAll(() => {

        prismaUserCreateRepository = new PrismaUserCreateRepository;
        prismaUserDeleteRepository = new PrismaUserDeleteRepository;
        prismaUserFindRepository = new PrismaUserFindRepository;
        prismaUserUpdateRepository = new PrismaUserUpdateRepository;

    });

    afterAll(async () => {
        await prismaUserDeleteRepository.destroyer();
    });


    it("should create user and find update", async () => {
        const user = new userFactory().create();
        const create = await prismaUserCreateRepository.create(user) as UserValidProps;
        create.email = "bola@gmail.com";

        const update = await prismaUserUpdateRepository.update(create);
        expect(update.email).toEqual("bola@gmail.com")
    });


    // it("should fail in update with email exist", async () => {
    //     const user = new userFactory().create();
    //     const create = await prismaUserCreateRepository.create(user) as UserValidProps;
    //     create.email = "bola@gmail.com";

    //     expect(await prismaUserUpdateRepository.update(create)).toThrow()
    // });



});