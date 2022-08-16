import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../../src/repositories/prisma/user/PrismaUserUpdateRepository";
import { JobValidation } from "../../../src/util/jobs/JobValidation";
import { UserValidation } from "../../../src/util/users/UserValidation";
import { jobFactory } from "../../utils/jobFactory";
import { userFactory } from "../../utils/userFactory";

describe("[unit] - jobValidation", () => {

    it("should pass without error in create user ", async () => {
        const user = new userFactory().create();

        const validation = new UserValidation(
            new PrismaUserFindRepository()
        ).pass(user);

        expect(Object.values(validation).length).toBe(0)
    });

    it("should fail in pass in create user ", async () => {

        const data: any = {
            name: '',
            email: 'fds@g.mail.',
            password: '',
            token: '',
            confirm_password: '',
            role: "sdasdasda"
        }

        const validation = await new UserValidation(
            new PrismaUserFindRepository()
        ).pass(data);
        expect(Object.values(validation).length).toBeGreaterThan(3)
    });


    it("should validate job values ", async () => {
        const job = new jobFactory().create('token', 999);

        const validation = await new JobValidation().pass(job)

        expect(Object.values(validation).length).toBe(0)
    });


    it("should fail in validate job values ", async () => {
        const job = new jobFactory().createMalFormatedValues('token');

        const validation = await new JobValidation().pass(job)

        expect(Object.values(validation).length).toBeGreaterThan(9)
    });


});

