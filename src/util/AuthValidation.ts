import axios from "axios";
import bcryptjs from "bcryptjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import auth from '../config/auth';
import { SignInProps } from "../types";


export class AuthValidation {

    async signIn(values: SignInProps) {
        let regex = new RegExp(
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        );

        const err = {} as SignInProps;


        if (values.email.trim().length === 0 || regex.test(values.email) === false) {
            err.email = 'Email mal formatado';
        }

        if (values.password.trim().length < 8) {
            err.password = 'A senha deve ter 8 digitos';
        }

        return err;
    }

    // async validToken(token: string) {
    //     const response = await axios.get(
    //         'https://www.google.com/recaptcha/api/siteverify?secret=' +
    //         process.env.API_KEY_TOKEN +
    //         '&response=' +
    //         token
    //     );

    //     if (!response.data.success) {
    //         throw Error("token não é valido")
    //     }
    // }

    async setTokenAuth(_id: number) {
        if (!authConfig[0].secret) {
            return;
        }

        const token = jwt.sign({ id: _id }, authConfig[0].secret, {
            expiresIn: 86400,
        });

        return token;
    }

}