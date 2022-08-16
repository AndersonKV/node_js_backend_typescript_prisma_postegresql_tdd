import { User } from "@prisma/client";
import { UserUpdateProps, UserValidProps } from "../../types";
import { UserPass } from "./UserPass";



export class UserUpdateValidation extends UserPass {

    async update(values: UserUpdateProps, user: User) {
        this.clean();

        await this.checkIsChangeEmail(values.email, user.email)

        this.name(values.name)

        if (values.new_password) {
            await this.updatePassword(values.password, values.new_password, user.password)
        } else {
            await this.onlyValidatePassword(values.password, user.password)
        }

        return this.get()
    }


}

