import { UtilsUser } from "..";
import { PrismaUserFindRepository } from "../../repositories/prisma/user/PrismaUserFindRepository";
import { PrismaUserUpdateRepository } from "../../repositories/prisma/user/PrismaUserUpdateRepository";
import { RoleUserValidProps, UserValidProps } from "../../types";

export class UserPass extends UtilsUser {
    constructor(private prismaUserFindRepository: PrismaUserFindRepository) {
        super();
    }
    private errors = {} as any;

    get() {
        return this.errors;
    }
    clean() {
        this.errors = {};
    }
    protected name(name: string) {
        if (name.trim().length < 6 || name.trim().length > 30) {
            this.errors.name = 'O nome deve ter entre 6 e 30 caracteres';
        }

    }

    protected async email(email: string) {
        if (email.trim().length === 0 || this.regex.test(email) === false) {
            this.errors.email = 'Email mal formatado';
        }
    }

    protected async checkIsChangeEmail(email: string, actualEmail: string) {
        if (email.trim().length === 0 || this.regex.test(email) === false) {
            this.errors.email = 'Email mal formatado';
        } else if (email !== actualEmail) {
            const exist = await this.prismaUserFindRepository.existEmail(email);

            // if (exist) {
            //     this.errors.email = exist;
            // }

        }
    }

    protected password(password: string, confirm_password: string) {
        if (password.trim().length < 8) {
            this.errors.password = 'A senha deve ter 8 digitos';
        }

        if (password !== confirm_password) {
            this.errors.confirm_password = 'As senhas devem ser igual';
        }


    }

    protected async onlyValidatePassword(password: string, hash_password: string) {
        const dencoded = await this.dencodedPassword(password, hash_password)

        if (!dencoded) {
            this.errors.wrong_password = "Senha errada"
        }

    }

    async updatePassword(password: string, new_password: string, hash_password: string) {
        if (password.trim().length < 8) {
            this.errors.password = 'A senha atual deve ter no minimo 8 digitos';
        }

        if (new_password.trim().length < 8) {
            this.errors.new_password = 'A nova senha deve ter no minimo 8 digitos';
        }

        const dencoded = await this.dencodedPassword(password, hash_password)

        if (!dencoded) {
            this.errors.wrong_password = "Senha errada"
        }

    }


    protected async verifyRole(role: string) {
        // if (role === 'USER') {
        // } else if (role === 'COMPANY') {
        // } else {
        this.errors.role = "falha com o registro do role"
        // }


    }

}
