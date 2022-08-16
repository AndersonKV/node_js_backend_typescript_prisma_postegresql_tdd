import { JobCreateController } from "../../../controllers/JobController/JobCreateController";
import { PrismaJobCreateRepository } from "../../../repositories/prisma/job/PrismaJobCreateRepository";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";
import { UtilsUser } from "../../../util";
import { JobValidation } from "../../../util/jobs/JobValidation";

const jobCreateController = new JobCreateController(
    new PrismaUserFindRepository(),
    new PrismaJobCreateRepository(),
    new JobValidation(),
    new UtilsUser());

export { jobCreateController }