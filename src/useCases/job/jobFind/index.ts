import { JobFindController } from "../../../controllers/JobController/JobFindController";
import { PrismaJobFindRepository } from "../../../repositories/prisma/job/PrismaJobFindRepository";
import { UtilsDate } from "../../../util";

const jobFindController = new JobFindController(
    new PrismaJobFindRepository(),
    new UtilsDate());

export { jobFindController }