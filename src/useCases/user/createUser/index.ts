import { UserCreateController } from "../../../controllers/UserControllers/UserCreateController";
import { PrismaUserCreateRepository } from "../../../repositories/prisma/user/PrismaUserCreateRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../../repositories/prisma/user/PrismaUserUpdateRepository";
import { UtilsUser } from "../../../util";
import { AuthValidation } from "../../../util/AuthValidation";
import { UserValidation } from "../../../util/users/UserValidation";

const userCreateController = new UserCreateController(
    new PrismaUserCreateRepository(),
    new PrismaUserFindRepository(),
    new UserValidation(new PrismaUserFindRepository),
    new UtilsUser(),
);

export { userCreateController }