import { User } from "@prisma/client";
import { PrismaUserFindRepository } from "../../../src/repositories/prisma/user/PrismaUserFindRepository";
import { UserUpdateValidation } from "../../../src/util/users/UserUpdateValidation";
import { userFactory } from "../../utils/userFactory";

describe("[unit] - userUpdateValidation", () => {

    it("should pass without error in update user ", async () => {
        const user = new userFactory().create();
        const user2 = new userFactory().create() as unknown as User;

        const validation = new UserUpdateValidation(
            new PrismaUserFindRepository()
        ).update(user, user2);

        expect(Object.values(validation).length).toBe(0)
    });



    it("should fail in update user ", async () => {

        const data: any = {
            name: '',
            email: 'fds@g.mail.',
            password: '',
            token: '',
            confirm_password: '',
            role: "sdasdasda",
            avatar: '',
        }

        const data2: any = {
            name: '',
            email: 'fds@g.mail.',
            password: '',
            token: '',
            confirm_password: '',
            role: "sdasdasda",
            avatar: '',
        }



        const validation = await new UserUpdateValidation(
            new PrismaUserFindRepository()
        ).update(data, data2);

        expect(Object.values(validation).length).toBeGreaterThan(0)

    });





});

