import { MatchingCreateController } from "../../../controllers/MatchingController/MatchingCreateController";
import { PrismaMatchingCreateRepository } from "../../../repositories/prisma/matching/PrismaMatchingCreateRepository";
import { PrismaMatchingFindRepository } from "../../../repositories/prisma/matching/PrismaMatchingFindRepository";
import { PrismaJobFindRepository } from "../../../repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { UtilsDate, UtilsUser } from "../../../util";

const matchingCreateController = new MatchingCreateController(
    new PrismaUserFindRepository(),
    new PrismaJobFindRepository(),
    new PrismaMatchingCreateRepository(),
    new PrismaMatchingFindRepository(),
    new UtilsUser(),
    new UtilsDate()
);

export { matchingCreateController }

