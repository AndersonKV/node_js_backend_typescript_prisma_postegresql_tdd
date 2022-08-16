import { JobDeleteController } from "../../../controllers/JobController/JobDeleteController";
import { PrismaJobDeleteRepositry } from "../../../repositories/prisma/job/PrismaJobDeleteRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";

const jobDeleteController = new JobDeleteController(
    new PrismaJobDeleteRepositry());

export { jobDeleteController }