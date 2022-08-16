import { UserFindController } from "../../../controllers/UserControllers/UserFindController";
import { PrismaUserFindRepository } from "../../../repositories/prisma/user/PrismaUserFindRepository";

const userFindController = new UserFindController(new PrismaUserFindRepository());

export { userFindController }