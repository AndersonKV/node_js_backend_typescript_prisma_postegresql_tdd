import { UserUpdateController } from "../../../controllers/UserControllers/UserUpdateController";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../../repositories/prisma/user/PrismaUserUpdateRepository";
import { UtilsUser } from "../../../util";
import { UserUpdateValidation } from "../../../util//users/UserUpdateValidation";
import { AuthValidation } from "../../../util/AuthValidation";

const userUpdateController = new UserUpdateController(
    new PrismaUserUpdateRepository(),
    new PrismaUserFindRepository(),
    new UserUpdateValidation(new PrismaUserFindRepository()),
    new UtilsUser(),
    new AuthValidation(),

);

export { userUpdateController }