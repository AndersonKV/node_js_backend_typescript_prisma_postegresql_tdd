import { JobAuthController } from "../../../controllers/AuthController/JobAuthController";
import { PrismaMatchingFindRepository } from "../../../repositories/prisma/matching/PrismaMatchingFindRepository";
import { PrismaAuthRepository } from "../../../repositories/prisma/auth/PrismaAuthRepository";
import { PrismaJobFindRepository } from "../../../repositories/prisma/job/PrismaJobFindRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";

const jobAuthController = new JobAuthController(
    new PrismaJobFindRepository(),
    new PrismaAuthRepository(),
    new PrismaUserFindRepository(),
    new PrismaMatchingFindRepository()
);

export { jobAuthController }