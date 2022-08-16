import { User } from "@prisma/client";
import { UserValidProps } from "../../../types";

export interface IUserCreateRepository {
    create(data: UserValidProps): Promise<User>
}