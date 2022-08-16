import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../../src/repositories/prisma/user/PrismaUserUpdateRepository";
import { UserValidation } from "../../../src/util/users/UserValidation";
import { userFactory } from "../../utils/userFactory";

describe("[unit] - userValidation", () => {

    it("should pass without error in create user ", async () => {
        const user = new userFactory().create();

        const validation = await new UserValidation(
            new PrismaUserFindRepository()
        ).pass(user);

        expect(Object.values(validation).length).toBe(0)
    });

    it("should throw error with empty values", async () => {
        const user = new userFactory().createEmptyValues();


        const validation = await new UserValidation(
            new PrismaUserFindRepository()
        ).pass(user);

        expect(Object.values(validation).length).toBeGreaterThan(0)
    });

    it("should fail in create user wrong role ", async () => {

        const user = {
            email: '',
            name: '',
            password: '',
            Authorization: '',
            role: '',
            avatar: ''
        } as any;

        const validation = await new UserValidation(
            new PrismaUserFindRepository()
        ).pass(user);

        expect(Object.values(validation).length).toBeGreaterThan(0)

    });





});

