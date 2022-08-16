import { UserDeleteController } from "../../../controllers/UserControllers/UserDeleteController";
import { PrismaUserDeleteRepository } from "../../../repositories/prisma/user/PrismaUserDeleteRepository";

const userDeleteController = new UserDeleteController(new PrismaUserDeleteRepository());

export { userDeleteController }