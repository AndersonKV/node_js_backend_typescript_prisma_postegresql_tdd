import { User } from "@prisma/client";
import { UserValidProps } from "../../../types";

export interface IUserUpdateRepository {
    update(data: UserValidProps): Promise<User>
}