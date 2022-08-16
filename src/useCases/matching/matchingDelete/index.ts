import { MatchingDeleteController } from "../../../controllers/MatchingController/MatchingDeleteController";
import { PrismaMatchingDeleteRepository } from "../../../repositories/prisma/matching/PrismaMatchingDeleteRepository";
import { PrismaJobFindRepository } from "../../../repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { UtilsUser } from "../../../util";

const matchingDeleteController = new MatchingDeleteController(
    new PrismaUserFindRepository(),
    new PrismaJobFindRepository(),
    new PrismaMatchingDeleteRepository(),
    new UtilsUser(),

);

export {
    matchingDeleteController
}