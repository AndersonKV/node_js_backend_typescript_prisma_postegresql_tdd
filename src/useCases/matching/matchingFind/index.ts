import { MatchingFindController } from "../../../controllers/MatchingController/MatchingFindController";
import { PrismaMatchingFindRepository } from "../../../repositories/prisma/matching/PrismaMatchingFindRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";

const matchingFindController = new MatchingFindController(new PrismaMatchingFindRepository(), new PrismaUserFindRepository());

export { matchingFindController }


