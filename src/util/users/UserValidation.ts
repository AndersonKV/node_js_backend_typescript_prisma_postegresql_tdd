import { JobSaveProps, RoleUserValidProps, UserValidProps } from "../../types"
import { User } from "@prisma/client";
import { UserPass } from "./UserPass";
import { Response } from "express";



export class UserValidation extends UserPass {

    async pass(user: UserValidProps) {
        await this.email(user.email)
        this.name(user.name)
        this.password(user.password, user.confirm_password)

        /*dentro do Userpass a condicional não esta conseguindo
        ser feita, talvez problema de cache, mesmo o valor
        estando certo ele acusa error
        */

        if (user.role === 'USER') {
        } else if (user.role === 'COMPANY') {
        } else {
            this.verifyRole(user.role);
        }

        return this.get()
    }

}

