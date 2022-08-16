import { UserAuthController } from "../../../controllers/AuthController/AuthController";
import { PrismaMatchingFindRepository } from "../../../repositories/prisma/matching/PrismaMatchingFindRepository";
import { PrismaAuthRepository } from "../../../repositories/prisma/auth/PrismaAuthRepository";
import { PrismaJobFindRepository } from "../../../repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { UtilsDate, UtilsJob, UtilsUser } from "../../../util";
import { AuthValidation } from "../../../util/AuthValidation";

const authController = new UserAuthController(
    new PrismaAuthRepository(),
    new PrismaMatchingFindRepository(),
    new PrismaJobFindRepository(),
    new PrismaUserFindRepository(),
    new UtilsUser(),
    new UtilsDate(),
    new UtilsJob(),
    new AuthValidation(),
);



export { authController }

